# Reviewed image drop folder

Place externally generated PNG, JPEG, or WebP files here using the exact Idea slug as the filename, for example:

`blind-taste-test-night.png`

After visually comparing every file with its matching record in `../idea-image-generation-plan.json`, run:

```bash
npm run images:install -- --reviewed assets/generated-idea-images
```

The installer normalizes approved images to 1500 x 1000 WebP and activates only the matching Idea slugs.
