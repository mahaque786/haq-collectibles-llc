# Collection Images Folder

This folder contains images for the collection gallery on your website.

## How to Add Images

1. **Add your image files** to this folder
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
   - Recommended: Use JPG for photographs, PNG for graphics

2. **Update `images.json`** with your image details:

```json
{
  "images": [
    {
      "filename": "your-image-file.jpg",
      "title": "Display Title",
      "category": "coins",
      "description": "Optional description"
    }
  ]
}
```

## Categories

Use these category names for filtering:
- `coins`
- `currency`
- `books`
- `cards`
- `games`
- `tech`
- `ephemera`
- `exonumia`

Or use any custom category you prefer.

## Image Tips

- **Quality**: Use high-resolution images (at least 800px on the longest side)
- **File size**: Optimize images for web (aim for under 500KB each)
- **Naming**: Use descriptive filenames like `coin-1921-morgan-dollar.jpg`
- **Consistency**: Try to use similar lighting and backgrounds

## Auto-Detection (Alternative)

If you don't want to maintain `images.json`, you can enable GitHub API auto-detection:

1. Edit `js/collection.js`
2. Set `USE_GITHUB_API: true`
3. Set your `GITHUB_REPO` value
4. Name files with category prefix: `coins-morgan-dollar.jpg`

See the main README.md for more details.
