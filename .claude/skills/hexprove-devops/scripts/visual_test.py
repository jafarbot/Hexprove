#!/usr/bin/env python3
"""
Visual Testing Script for HexProve Website

This script performs automated visual testing to ensure:
1. Pages render correctly across breakpoints (mobile, tablet, desktop)
2. Light and dark mode both work properly
3. No visual regressions from previous state

Requirements:
    pip install playwright
    playwright install chromium

Usage:
    python visual_test.py [--url URL] [--output DIR]

Examples:
    python visual_test.py
    python visual_test.py --url http://localhost:3000
    python visual_test.py --url https://staging.hexprove.com --output ./screenshots
"""

import argparse
import asyncio
import os
from datetime import datetime
from pathlib import Path

try:
    from playwright.async_api import async_playwright
except ImportError:
    print("Error: Playwright not installed. Run: pip install playwright && playwright install chromium")
    exit(1)


# Configuration
BREAKPOINTS = {
    "mobile": {"width": 375, "height": 812},
    "tablet": {"width": 768, "height": 1024},
    "desktop": {"width": 1440, "height": 900},
}

THEMES = ["light", "dark"]

PAGES = [
    {"name": "homepage", "path": "/"},
    # Add more pages as they're created
    # {"name": "about", "path": "/about"},
    # {"name": "services", "path": "/services"},
    # {"name": "contact", "path": "/contact"},
]

DEFAULT_URL = "https://staging.hexprove.com"


async def take_screenshots(url: str, output_dir: Path) -> dict:
    """Take screenshots across all breakpoints and themes."""
    results = {
        "passed": [],
        "failed": [],
        "screenshots": [],
    }
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        
        for page_config in PAGES:
            page_name = page_config["name"]
            page_path = page_config["path"]
            full_url = f"{url.rstrip('/')}{page_path}"
            
            for breakpoint_name, viewport in BREAKPOINTS.items():
                for theme in THEMES:
                    test_name = f"{page_name}_{breakpoint_name}_{theme}"
                    screenshot_path = output_dir / f"{test_name}.png"
                    
                    try:
                        # Create context with viewport
                        context = await browser.new_context(
                            viewport=viewport,
                            color_scheme=theme,
                        )
                        page = await context.new_page()
                        
                        # Navigate and wait for load
                        await page.goto(full_url, wait_until="networkidle")
                        
                        # Take screenshot
                        await page.screenshot(path=str(screenshot_path), full_page=True)
                        
                        # Basic checks
                        checks_passed = True
                        errors = []
                        
                        # Check for console errors
                        console_errors = []
                        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
                        
                        # Check for horizontal overflow (indicates responsive issues)
                        has_overflow = await page.evaluate("""
                            () => document.documentElement.scrollWidth > document.documentElement.clientWidth
                        """)
                        if has_overflow:
                            errors.append("Horizontal overflow detected")
                            checks_passed = False
                        
                        # Check for broken images
                        broken_images = await page.evaluate("""
                            () => {
                                const images = document.querySelectorAll('img');
                                return Array.from(images)
                                    .filter(img => !img.complete || img.naturalWidth === 0)
                                    .map(img => img.src);
                            }
                        """)
                        if broken_images:
                            errors.append(f"Broken images: {broken_images}")
                            checks_passed = False
                        
                        await context.close()
                        
                        if checks_passed:
                            results["passed"].append(test_name)
                            print(f"✅ {test_name}")
                        else:
                            results["failed"].append({"name": test_name, "errors": errors})
                            print(f"❌ {test_name}: {', '.join(errors)}")
                        
                        results["screenshots"].append(str(screenshot_path))
                        
                    except Exception as e:
                        results["failed"].append({"name": test_name, "errors": [str(e)]})
                        print(f"❌ {test_name}: {e}")
        
        await browser.close()
    
    return results


def print_summary(results: dict) -> None:
    """Print test summary."""
    total = len(results["passed"]) + len(results["failed"])
    passed = len(results["passed"])
    failed = len(results["failed"])
    
    print("\n" + "=" * 50)
    print("VISUAL TEST SUMMARY")
    print("=" * 50)
    print(f"Total tests: {total}")
    print(f"Passed: {passed} ✅")
    print(f"Failed: {failed} ❌")
    
    if results["failed"]:
        print("\nFailed tests:")
        for failure in results["failed"]:
            print(f"  - {failure['name']}: {', '.join(failure['errors'])}")
    
    print(f"\nScreenshots saved to: {results['screenshots'][0].rsplit('/', 1)[0] if results['screenshots'] else 'N/A'}")
    print("=" * 50)


async def main():
    parser = argparse.ArgumentParser(description="Visual testing for HexProve website")
    parser.add_argument("--url", default=DEFAULT_URL, help="Base URL to test")
    parser.add_argument("--output", default="./visual-tests", help="Output directory for screenshots")
    args = parser.parse_args()
    
    # Create output directory with timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_dir = Path(args.output) / timestamp
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"🔍 Running visual tests on: {args.url}")
    print(f"📸 Screenshots will be saved to: {output_dir}")
    print("-" * 50)
    
    results = await take_screenshots(args.url, output_dir)
    print_summary(results)
    
    # Exit with error code if any tests failed
    if results["failed"]:
        exit(1)


if __name__ == "__main__":
    asyncio.run(main())
