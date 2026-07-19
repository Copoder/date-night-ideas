from pathlib import Path
import os
from playwright.sync_api import sync_playwright, expect

BASE = os.environ.get("QA_BASE_URL", "http://127.0.0.1:4322")
ARTIFACTS = Path("artifacts/qa")
ARTIFACTS.mkdir(parents=True, exist_ok=True)


def assert_no_overflow(page, label):
    overflow = page.evaluate("document.documentElement.scrollWidth - window.innerWidth")
    assert overflow <= 1, f"{label} has {overflow}px horizontal overflow"


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1440, "height": 1000})
    context.grant_permissions(["clipboard-read", "clipboard-write"], origin=BASE)
    page = context.new_page()
    page.set_default_timeout(10000)
    errors = []
    failed = []
    bad_responses = []
    page.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.on("requestfailed", lambda request: failed.append(f"{request.url}: {request.failure}"))
    page.on("response", lambda response: bad_responses.append(f"{response.status} {response.url}") if response.status >= 400 else None)

    page.goto(BASE, wait_until="networkidle")
    print("QA: desktop homepage loaded", flush=True)
    expect(page.locator("h1")).to_contain_text("Date night ideas")
    assert page.evaluate("document.activeElement.tagName") == "BODY", "homepage stole initial keyboard focus"
    expect(page.locator(".picker__top h2")).to_contain_text("Six quick calls")
    assert page.locator('.idea-directory a[href^="/ideas/"]').count() == 300, "homepage directory does not expose all 300 ideas"
    hero_width = page.locator(".hero__image").evaluate("image => image.naturalWidth")
    assert hero_width > 0, "hero image is blank"
    assert_no_overflow(page, "desktop homepage")
    page.screenshot(path=str(ARTIFACTS / "home-desktop.png"), full_page=True)

    page.locator('[data-question="relationship"] [data-value="first"]').click()
    page.locator('[data-question="location"] [data-value="home"]').click()
    page.locator('[data-question="budget"] [data-value="free"]').click()
    page.locator('[data-question="vibe"] [data-value="playful"]').click()
    page.locator('[data-question="duration"] [data-value="short"]').click()
    expect(page.locator('[data-question="limits"] [data-value="publicFriendly"]')).to_be_disabled()
    page.locator('[data-question="limits"] [data-value="noAlcohol"]').click()
    page.locator("[data-finish]").click()
    page.wait_for_url("**/results/?**")
    page.wait_for_load_state("networkidle")
    print("QA: picker completed", flush=True)
    expect(page.locator(".result-card")).to_have_count(3)
    result_meta = page.locator(".result-card__meta").all_text_contents()
    assert all("At home" in meta for meta in result_meta), f"home answer returned a location mismatch: {result_meta}"
    first_titles = page.locator(".result-card h3").all_text_contents()
    page.screenshot(path=str(ARTIFACTS / "results-desktop.png"), full_page=True)
    page.get_by_role("button", name="New set").click()
    second_titles = page.locator(".result-card h3").all_text_contents()
    assert first_titles != second_titles, "refresh did not change the result set"
    page.get_by_role("button", name="Share results").click()
    expect(page.locator("[data-share-status]")).to_have_text("Link copied.")
    expect(page.locator('meta[name="robots"]')).to_have_attribute("content", "noindex,follow")
    assert_no_overflow(page, "desktop results")

    page.locator(".result-card h3 a").first.click()
    page.wait_for_load_state("networkidle")
    print("QA: detail page loaded", flush=True)
    expect(page.locator("article h1")).not_to_be_empty()
    expect(page.locator(".source-grid li")).not_to_have_count(0)
    expect(page.locator(".source-grid li")).to_have_count(2)
    expect(page.locator(".edit-note")).to_be_visible()
    detail_width = page.locator(".idea-hero img").evaluate("image => image.naturalWidth")
    assert detail_width > 0, "idea image is blank"
    assert_no_overflow(page, "desktop idea detail")
    page.screenshot(path=str(ARTIFACTS / "idea-desktop.png"), full_page=True)

    page.goto(f"{BASE}/results/?relationship=first&location=home&budget=free&vibe=chill&duration=short&limits=publicFriendly", wait_until="networkidle")
    expect(page.locator(".result-card")).to_have_count(1)
    expect(page.locator(".results-heading h2")).to_have_text("One honest match.")

    page.goto(f"{BASE}/results/?relationship=first&location=home&budget=free&vibe=chill&duration=short&limits=kidFriendly&limits=publicFriendly", wait_until="networkidle")
    expect(page.locator(".result-card")).to_have_count(0)
    expect(page.locator("[data-empty-results]")).to_be_visible()
    expect(page.locator(".results-heading h2")).to_have_text("No honest match yet.")
    page.get_by_role("button", name="Try without hard limits").click()
    expect(page.locator(".result-card")).to_have_count(3)

    page.goto(f"{BASE}/results/?relationship=bogus&location=moon&budget=free&vibe=bogus&duration=short", wait_until="networkidle")
    expect(page.locator(".result-card")).to_have_count(3)
    assert "moon" not in page.url and "bogus" not in page.url, f"malformed URL was not normalized: {page.url}"

    mobile = context.new_page()
    mobile.set_viewport_size({"width": 390, "height": 844})
    mobile_errors = []
    mobile.on("console", lambda message: mobile_errors.append(message.text) if message.type == "error" else None)
    mobile.on("pageerror", lambda error: mobile_errors.append(str(error)))
    mobile.goto(BASE, wait_until="networkidle")
    print("QA: mobile homepage loaded", flush=True)
    assert_no_overflow(mobile, "mobile homepage")
    mobile.get_by_role("button", name="Open menu").click()
    expect(mobile.locator("[data-site-nav]")).to_have_attribute("data-open", "true")
    mobile.screenshot(path=str(ARTIFACTS / "home-mobile.png"), full_page=True)
    mobile.locator(".idea-directory details").nth(4).locator("summary").click()
    expect(mobile.locator(".idea-directory details").nth(4)).to_have_attribute("open", "")
    mobile.goto(f"{BASE}/results/?relationship=parents&location=home&budget=low&vibe=chill&duration=short&limits=lowPrep", wait_until="networkidle")
    print("QA: mobile results loaded", flush=True)
    expect(mobile.locator(".result-card")).to_have_count(3)
    assert_no_overflow(mobile, "mobile results")
    mobile.screenshot(path=str(ARTIFACTS / "results-mobile.png"), full_page=True)

    assert not errors, f"desktop console errors: {errors}"
    assert not mobile_errors, f"mobile console errors: {mobile_errors}"
    real_failed = [request for request in failed if "ERR_ABORTED" not in request]
    assert not real_failed, f"failed requests: {real_failed}"
    assert not bad_responses, f"bad HTTP responses: {bad_responses}"
    browser.close()

print("Browser QA passed: desktop/mobile flows, focus order, 300-link directory, limit availability, empty-state recovery, URL validation, research notes, images, share, console, and network.")
