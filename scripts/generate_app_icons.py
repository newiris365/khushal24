import os
from PIL import Image, ImageDraw, ImageFont

def draw_iris_logo(size):
    # Create high-res RGBA image
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Background rounded rectangle
    margin = int(size * 0.05)
    corner_radius = int(size * 0.22)
    
    # Draw dark slate/indigo gradient background
    bg_box = [margin, margin, size - margin, size - margin]
    draw.rounded_rectangle(bg_box, radius=corner_radius, fill=(15, 23, 42, 255), outline=(139, 92, 246, 180), width=int(size * 0.03))

    # Inner glowing tech ring
    center = (size // 2, size // 2)
    radius = int(size * 0.28)
    bbox = [center[0] - radius, center[1] - radius, center[0] + radius, center[1] + radius]
    draw.ellipse(bbox, outline=(108, 43, 217, 240), width=int(size * 0.04))

    # Inner iris core
    core_radius = int(size * 0.14)
    core_bbox = [center[0] - core_radius, center[1] - core_radius, center[0] + core_radius, center[1] + core_radius]
    draw.ellipse(core_bbox, fill=(139, 92, 246, 255), outline=(196, 181, 253, 255), width=int(size * 0.025))

    # Center white pupil accent
    pupil_r = int(size * 0.05)
    pupil_bbox = [center[0] - pupil_r, center[1] - pupil_r, center[0] + pupil_r, center[1] + pupil_r]
    draw.ellipse(pupil_bbox, fill=(255, 255, 255, 255))

    return img

def main():
    public_dir = os.path.join(os.path.dirname(__file__), "..", "public")

    # Generate 512x512 icon
    icon_512 = draw_iris_logo(512)
    icon_512.save(os.path.join(public_dir, "icon-512.png"), "PNG")
    print("Generated public/icon-512.png (512x512)")

    # Generate 192x192 icon
    icon_192 = draw_iris_logo(192)
    icon_192.save(os.path.join(public_dir, "icon-192.png"), "PNG")
    print("Generated public/icon-192.png (192x192)")

    # Generate favicon.ico
    icon_32 = draw_iris_logo(32)
    icon_32.save(os.path.join(public_dir, "favicon.ico"), format="ICO", sizes=[(32, 32), (16, 16)])
    print("Generated public/favicon.ico")

if __name__ == "__main__":
    main()
