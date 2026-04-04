"""
split_pdf.py — Split a large PDF into smaller chunks.

Usage:
    python split_pdf.py input.pdf
    python split_pdf.py input.pdf --pages-per-chunk 200
    python split_pdf.py input.pdf --pages-per-chunk 150 --output-dir ./split_output
"""

import argparse
import math
import os
from pypdf import PdfReader, PdfWriter


def split_pdf(input_path: str, pages_per_chunk: int = 200, output_dir: str = None):
    """
    Split a PDF into chunks of `pages_per_chunk` pages each.

    Args:
        input_path:      Path to the source PDF file.
        pages_per_chunk: Max pages in each output file (default: 200).
        output_dir:      Folder to save split files. Defaults to same folder as input.
    """
    if not os.path.exists(input_path):
        raise FileNotFoundError(f"File not found: {input_path}")

    reader = PdfReader(input_path)
    total_pages = len(reader.pages)
    print(f"📄 '{input_path}' has {total_pages} pages.")

    if total_pages <= pages_per_chunk:
        print(f"✅ PDF has {total_pages} pages — no splitting needed (limit is {pages_per_chunk}).")
        return

    # Resolve output directory
    base_name = os.path.splitext(os.path.basename(input_path))[0]
    if output_dir is None:
        output_dir = os.path.dirname(os.path.abspath(input_path))
    os.makedirs(output_dir, exist_ok=True)

    num_chunks = math.ceil(total_pages / pages_per_chunk)
    print(f"✂️  Splitting into {num_chunks} parts ({pages_per_chunk} pages each)...\n")

    for chunk_index in range(num_chunks):
        start_page = chunk_index * pages_per_chunk          # 0-based
        end_page   = min(start_page + pages_per_chunk, total_pages)

        writer = PdfWriter()
        for page_num in range(start_page, end_page):
            writer.add_page(reader.pages[page_num])

        output_filename = f"{base_name}_part{chunk_index + 1}_pages{start_page + 1}-{end_page}.pdf"
        output_path = os.path.join(output_dir, output_filename)

        with open(output_path, "wb") as out_file:
            writer.write(out_file)

        print(f"  ✔ Part {chunk_index + 1}: pages {start_page + 1}–{end_page}  →  {output_filename}")

    print(f"\n🎉 Done! {num_chunks} files saved to: {output_dir}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Split a large PDF into smaller chunks.")
    parser.add_argument("input",            help="Path to the input PDF file")
    parser.add_argument(
        "--pages-per-chunk", type=int, default=200,
        help="Number of pages per output file (default: 200)"
    )
    parser.add_argument(
        "--output-dir", default=None,
        help="Directory to save output files (default: same as input)"
    )
    args = parser.parse_args()

    split_pdf(
        input_path=args.input,
        pages_per_chunk=args.pages_per_chunk,
        output_dir=args.output_dir,
    )