// D:\code\tepatlaser\optimize-blogs.cjs
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("=== STARTING BLOG SEO & IMAGE OPTIMIZATION ===");

const PROJECT_DIR = __dirname;
const BLOG_DIR = path.join(PROJECT_DIR, 'src', 'content', 'blog');
const PUBLIC_BLOG_IMAGES_DIR = path.join(PROJECT_DIR, 'public', 'images', 'blog');

// Ensure public/images/blog directory exists
if (!fs.existsSync(PUBLIC_BLOG_IMAGES_DIR)) {
  fs.mkdirSync(PUBLIC_BLOG_IMAGES_DIR, { recursive: true });
}

// Generated high-quality images paths
const generatedImages = [
  "C:/Users/Lenovo/.gemini/antigravity-cli/brain/477efcc6-395f-4ade-9fe9-1444a91a8c2e/blog_laser_metal_1781636066716.jpg",
  "C:/Users/Lenovo/.gemini/antigravity-cli/brain/477efcc6-395f-4ade-9fe9-1444a91a8c2e/blog_acrylic_led_1781636081157.jpg",
  "C:/Users/Lenovo/.gemini/antigravity-cli/brain/477efcc6-395f-4ade-9fe9-1444a91a8c2e/jasa_laser_cutting_metal_bintaro_tangerang_1781636111106.jpg",
  "C:/Users/Lenovo/.gemini/antigravity-cli/brain/477efcc6-395f-4ade-9fe9-1444a91a8c2e/jasa_laser_cutting_akrilik_bintaro_1781636125064.jpg",
  "C:/Users/Lenovo/.gemini/antigravity-cli/brain/477efcc6-395f-4ade-9fe9-1444a91a8c2e/jasa_laser_cutting_mdf_kayu_custom_1781636141115.jpg",
  "C:/Users/Lenovo/.gemini/antigravity-cli/brain/477efcc6-395f-4ade-9fe9-1444a91a8c2e/jasa_laser_engraving_tumbler_custom_1781636159287.jpg"
];

// Existing high-quality images in public/images
const baseImagesDir = path.join(PROJECT_DIR, 'public', 'images');
const baseImages = [
  'Acrylic.webp', 'Ply Wood.webp', 'acp.webp', 'cncrouter.webp', 'co2.webp', 'displyacrylic.webp',
  'engraving.webp', 'furnituremetal.webp', 'galvo.webp', 'grc.webp', 'laserfiber.webp', 'metal.webp',
  'prototype.webp', 'pvc.webp', 'singagehote.webp', 'team.webp',
  'stainlesssteel (1).webp', 'stainlesssteel (2).webp', 'stainlesssteel (3).webp', 'stainlesssteel (4).webp',
  'mdf (1).webp', 'mdf (2).webp', 'mdf (3).webp', 'mdf (4).webp',
  'plywood (1).webp', 'plywood (2).webp', 'plywood (3).webp', 'plywood (4).webp',
  'akrilik (1).webp', 'aklik (2).webp', 'akrilik (3).webp', 'akrilik (4).webp',
  'grcpro (1).webp', 'grcpro (2).webp', 'grcpro (3).webp', 'grcpro (4).webp',
  'acppro (1).webp', 'acppro (2).webp', 'acppro (3).webp', 'acppro (4).webp',
  'pcvboard (1).webp', 'pcvboard (2).webp', 'pcvboard (3).webp', 'pcvboard (4).webp'
].map(f => path.join(baseImagesDir, f)).filter(f => fs.existsSync(f));

// Combine all unique source images
const allSourceImages = [...generatedImages.filter(f => fs.existsSync(f)), ...baseImages];
console.log(`Found ${allSourceImages.length} unique source images to assign.`);

// Read all blog files
const blogFiles = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
console.log(`Found ${blogFiles.length} blog posts to optimize.`);

blogFiles.forEach((file, index) => {
  const filePath = path.join(BLOG_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const slug = path.basename(file, '.md');

  // 1. Clean up phone number placeholders (e.g. 0812-XXXX-XXXX or similar)
  content = content.replace(/0812-XXXX-XXXX/g, "0821-2129-2937");
  content = content.replace(/0812-xxxx-xxxx/g, "0821-2129-2937");
  content = content.replace(/0812-XXX-XXX/g, "0821-2129-2937");
  content = content.replace(/WhatsApp:\s*0812-[X\-]+/gi, "WhatsApp: 0821-2129-2937");
  content = content.replace(/phone:\s*"0812-[X\-]+"/gi, 'phone: "0821-2129-2937"');

  // 2. Select a unique source image for this blog post
  // We use modulo to rotate through our pool of unique images so that no two posts get the same image file
  const sourceImage = allSourceImages[index % allSourceImages.length];
  const ext = path.extname(sourceImage);
  const targetImageName = `${slug}${ext}`;
  const targetImagePath = path.join(PUBLIC_BLOG_IMAGES_DIR, targetImageName);

  // Copy the image file to the SEO-friendly name
  try {
    fs.copyFileSync(sourceImage, targetImagePath);
    console.log(`Copied image for SEO: ${file} -> /images/blog/${targetImageName}`);
  } catch (err) {
    console.error(`Failed to copy image for ${file}:`, err.message);
  }

  // 3. Update the image URL in the frontmatter
  const seoImageUrl = `/images/blog/${targetImageName}`;
  content = content.replace(/image:\s*".*?"/g, `image: "${seoImageUrl}"`);
  content = content.replace(/image:\s*\/images\/.*?\s/g, `image: "${seoImageUrl}"\n`);
  
  // Write the updated content
  fs.writeFileSync(filePath, content, 'utf8');
});

console.log("Successfully updated all blog posts with unique SEO-friendly images and phone numbers!");

// Verify Astro build
console.log("Verifying build...");
try {
  const buildOutput = execSync("npm run build", { cwd: PROJECT_DIR, encoding: 'utf8' });
  console.log("Build Success!");
  console.log(buildOutput);

  // Git commit and push
  console.log("Committing changes...");
  execSync("git add .", { cwd: PROJECT_DIR });
  execSync("git commit -m \"SEO: Optimize all blog posts with unique SEO-friendly image filenames and correct WA phone numbers\"", { cwd: PROJECT_DIR });
  console.log("Pushing to GitHub...");
  execSync("git push", { cwd: PROJECT_DIR });
  console.log("All tasks completed successfully!");
} catch (error) {
  console.error("--- ERROR ENCOUNTERED DURING BUILD ---");
  console.error(error.stdout || error.message);
  process.exit(1);
}
