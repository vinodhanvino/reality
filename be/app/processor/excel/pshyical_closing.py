import io
from typing import Optional, List, Dict, Any

import polars as pl
import logging
import os, json, re

from tqdm import tqdm

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("SpirixData")

# master_data = pl.read_excel(rf"D:\office\code\spirix resource\processed\master-ksbcl.xlsx", engine="calamine")
# master_data = master_data.rename({c: c.strip().lower().replace(" ", "_") for c in master_data.columns})


def transform_inventory_data(raw_data):
    transformed_data = []

    # Regex to find volume patterns like "1000 ml", "750ml", "330 ML"
    volume_pattern = re.compile(r'(\d+\s*ml)', re.IGNORECASE)

    for item in raw_data:
        name = item["particulars"].strip()
        raw_category = item["category"]

        # Initialize defaults
        clean_category = raw_category
        volume_info = ""

        # Check if the category contains a hyphen or volume info
        if "-" in raw_category:
            parts = raw_category.split('-')
            clean_category = parts[0].strip()
            volume_info = parts[1].strip()
        else:
            # If no hyphen, check if volume info is hiding in the string
            match = volume_pattern.search(raw_category)
            if match:
                volume_info = match.group(0)
                # Remove the volume from the category name
                clean_category = volume_pattern.sub('', raw_category).strip()

        # Build search_name: Particulars + Volume
        # If no volume was found, it just uses the name
        search_name = f"{name} {volume_info}".strip()

        transformed_item = {
            "particulars": item["particulars"],
            "category": clean_category,
            "receipt_uom": item["receipt_uom"],
            "sale_uom": item["sale_uom"],
            "main_bar_closing": item["main_bar_closing"],
            "store_closing": item["store_closing"],
            "search_name": search_name
        }

        transformed_data.append(transformed_item)

    return transformed_data


def process_uploaded_excel(file_content: bytes) -> Optional[List[Dict[str, Any]]]:
    try:
        # 1. Load from bytes using BytesIO
        # Note: Polars read_excel with engine="calamine" supports bytes
        df = pl.read_excel(source=io.BytesIO(file_content), engine="calamine")

        # 2. Normalize Headers
        df = df.rename({c: c.strip().lower().replace(" ", "_").replace("\n", "_") for c in df.columns})
        normalized_columns = df.columns

        # 3. Dynamic ID Column Logic
        id_candidates = ["sku_id", "sku", "item_code", "product_id", "code", "particulars"]
        found_id_col = next((col for col in id_candidates if col in normalized_columns), None)

        if found_id_col:
            df = df.drop_nulls(subset=[found_id_col])

        # 4. Flexible Type Casting
        mutations = []
        # Check for price/mrp variations
        price_col = next((c for c in ["price", "mrp", "rate"] if c in normalized_columns), None)
        if price_col:
            mutations.append(pl.col(price_col).cast(pl.Float64, strict=False).fill_null(0.0))

        if "stock" in normalized_columns:
            mutations.append(pl.col("stock").cast(pl.Int64, strict=False).fill_null(0))

        if mutations:
            df = df.with_columns(mutations)
        result = transform_inventory_data(df.to_dicts())
        count = []
        for dt in tqdm(result):
            rel = get_highest_threshold_match(master_data, 's', dt.get('search_name'), 'mrp')
            if len(rel) < 1:
                count.append(dt.get('search_name'))
            dt.update(rel)
        print("'\n'".join([c for c in count]))
        return result
    except Exception as e:
        logger.error(f"Failed to process uploaded file: {str(e)}")
        return None


# --- Main Execution ---

import polars as pl
from thefuzz import process, fuzz


def get_highest_threshold_match(df, search_col, query, value_col, threshold=70):
    """
    Finds ONLY the single best match and returns it as a JSON object.
    """
    # 1. Get unique names from the search column to speed up the process
    choices = df.select(pl.col(search_col)).unique().to_series().to_list()

    # 2. Find the single BEST match (extractOne returns a tuple: (matched_string, score))
    match = process.extractOne(query, choices, scorer=fuzz.token_sort_ratio)

    if match and match[1] >= threshold:
        matched_name, score = match[0], match[1]

        # 3. Filter the original DataFrame to get the full row for this match
        # We use head(1) to guarantee only one record is returned
        result_row = df.filter(pl.col(search_col) == matched_name).head(1)

        # 4. Extract the value from the dynamic value_col (e.g., "mrp")
        # Safety check: if the column doesn't exist, return None
        extracted_value = (
            result_row.get_column(value_col)[0]
            if value_col in result_row.columns
            else None
        )

        # 5. Build and return the single JSON "image"
        return {
            "query": query,
            "matched_key": matched_name,
            "mrp": extracted_value,
            "threshold": score
        }

    # Return None if no match meets the threshold
    return {}

# --- Example with your 'physical closing' data ---
# Load your data (assumes you have the clean dataframe from the previous step)
# if __name__ == "__main__":
#
#     # Search for a typo: 'Budwiser' (Missing the 'e')
#     query = "Black Dog Centenary 8 yr"
#     threshold = 70
#     result_image = get_highest_threshold_match(
#         master_data,
#         search_col="s",
#         query=query,
#         value_col="mrp",
#         threshold=threshold
#     )
#
#     # 5. Output result
#     if result_image:
#         print(json.dumps(result_image, indent=4))
#     else:
#         print(f"No result found with confidence above 90%.")
