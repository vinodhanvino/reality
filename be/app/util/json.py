# app/utils/json_utils.py

import json
import gzip
import ijson
from pathlib import Path
from typing import Any, Dict, List, Optional, Union, Generator
from datetime import datetime, date
from decimal import Decimal
from fastapi import HTTPException
import logging

logger = logging.getLogger(__name__)


# ===================================================================================
# CUSTOM JSON ENCODERS/DECODERS
# ===================================================================================

class CustomJSONEncoder(json.JSONEncoder):
    """Handle non-serializable types like datetime, date, Decimal"""

    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        if isinstance(obj, date):
            return obj.isoformat()
        if isinstance(obj, Decimal):
            return float(obj)
        if isinstance(obj, bytes):
            return obj.decode('utf-8')
        if hasattr(obj, '__dict__'):
            return obj.__dict__
        return super().default(obj)


def custom_decoder(obj: Dict) -> Dict:
    """Custom decoder for specific type conversions"""
    for key, value in obj.items():
        # Convert ISO date strings to datetime
        if isinstance(value, str) and 'date' in key.lower():
            try:
                obj[key] = datetime.fromisoformat(value.replace('Z', '+00:00'))
            except (ValueError, AttributeError):
                pass
    return obj


# ===================================================================================
# BASIC JSON READ FUNCTIONS
# ===================================================================================

def read_json_file(file_path: Union[str, Path]) -> Dict[str, Any]:
    """
    Read JSON file and return as dictionary.

    Args:
        file_path: Path to JSON file

    Returns:
        Dictionary containing JSON data

    Raises:
        FileNotFoundError: If file doesn't exist
        json.JSONDecodeError: If JSON is malformed
    """
    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"JSON file not found: {file_path}")

    try:
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        logger.error(f"JSON decode error in {file_path}: {e}")
        raise
    except Exception as e:
        logger.error(f"Error reading {file_path}: {e}")
        raise


def read_json_file_safe(file_path: Union[str, Path], default: Any = None) -> Optional[Dict[str, Any]]:
    """
    Safe version - returns default instead of raising exceptions.

    Args:
        file_path: Path to JSON file
        default: Value to return on error (default: None)

    Returns:
        Dictionary or default value on error
    """
    try:
        return read_json_file(file_path)
    except (FileNotFoundError, json.JSONDecodeError, Exception) as e:
        logger.warning(f"Failed to read {file_path}: {e}")
        return default


def read_json_file_compressed(file_path: Union[str, Path]) -> Dict[str, Any]:
    """
    Read gzipped JSON file (.json.gz)

    Args:
        file_path: Path to compressed JSON file

    Returns:
        Dictionary containing JSON data
    """
    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"Compressed JSON file not found: {file_path}")

    try:
        with gzip.open(path, 'rt', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Error reading compressed JSON {file_path}: {e}")
        raise


# ===================================================================================
# STREAMING JSON FOR LARGE FILES (Memory efficient)
# ===================================================================================

def stream_json_array(file_path: Union[str, Path]) -> Generator[Dict, None, None]:
    """
    Stream large JSON arrays one item at a time.
    Memory efficient for huge files.

    Args:
        file_path: Path to JSON file containing an array

    Yields:
        Each item in the array

    Example:
        for item in stream_json_array("large_file.json"):
            process(item)  # Only one item in memory at a time
    """
    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"JSON file not found: {file_path}")

    with open(path, 'rb') as f:
        parser = ijson.items(f, 'item')
        for item in parser:
            yield item


def stream_json_file_lazy(file_path: Union[str, Path]) -> Generator[Any, None, None]:
    """
    Lazy streaming for any JSON structure.
    Use when you don't know the structure in advance.

    Args:
        file_path: Path to JSON file

    Yields:
        Parsed JSON objects as they're encountered
    """
    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"JSON file not found: {file_path}")

    with open(path, 'rb') as f:
        parser = ijson.parse(f)
        for prefix, event, value in parser:
            yield {"prefix": prefix, "event": event, "value": value}


def read_json_lines(file_path: Union[str, Path]) -> List[Dict]:
    """
    Read JSON Lines format (.jsonl or .ndjson)
    Each line is a separate JSON object.

    Args:
        file_path: Path to JSON Lines file

    Returns:
        List of JSON objects
    """
    path = Path(file_path)
    results = []

    if not path.exists():
        raise FileNotFoundError(f"JSON Lines file not found: {file_path}")

    with open(path, 'r', encoding='utf-8') as f:
        for line_num, line in enumerate(f, 1):
            line = line.strip()
            if not line:
                continue
            try:
                results.append(json.loads(line))
            except json.JSONDecodeError as e:
                logger.warning(f"Line {line_num} is malformed: {e}")
                continue

    return results


def stream_json_lines(file_path: Union[str, Path]) -> Generator[Dict, None, None]:
    """
    Stream JSON Lines format one line at a time.
    Memory efficient for huge files.

    Args:
        file_path: Path to JSON Lines file

    Yields:
        Each JSON object as it's parsed
    """
    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"JSON Lines file not found: {file_path}")

    with open(path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                yield json.loads(line)
            except json.JSONDecodeError as e:
                logger.warning(f"Skipping malformed line: {e}")
                continue


# ===================================================================================
# BATCH PROCESSING
# ===================================================================================

def read_json_batch(
        file_path: Union[str, Path],
        batch_size: int = 1000
) -> Generator[List[Dict], None, None]:
    """
    Read JSON array in batches for processing.

    Args:
        file_path: Path to JSON file containing array
        batch_size: Number of items per batch

    Yields:
        Batches of items
    """
    batch = []

    for item in stream_json_array(file_path):
        batch.append(item)

        if len(batch) >= batch_size:
            yield batch
            batch = []

    if batch:
        yield batch


# ===================================================================================
# VALIDATION & SCHEMA CHECKING
# ===================================================================================

def validate_json_structure(data: Dict, required_keys: List[str]) -> Dict[str, List[str]]:
    """
    Validate that JSON contains required keys.

    Args:
        data: JSON dictionary to validate
        required_keys: List of keys that must exist

    Returns:
        Dictionary with 'missing' and 'present' lists
    """
    present_keys = [k for k in required_keys if k in data]
    missing_keys = [k for k in required_keys if k not in data]

    return {
        "present": present_keys,
        "missing": missing_keys,
        "is_valid": len(missing_keys) == 0
    }


def validate_json_schema(data: Dict, schema: Dict) -> bool:
    """
    Basic JSON schema validation.
    For complex schemas, use 'jsonschema' library.

    Args:
        data: JSON data to validate
        schema: Simple schema with 'required' and 'types'

    Returns:
        True if valid, False otherwise
    """
    try:
        # Check required fields
        if 'required' in schema:
            for field in schema['required']:
                if field not in data:
                    logger.error(f"Missing required field: {field}")
                    return False

        # Check types
        if 'properties' in schema:
            for field, field_schema in schema['properties'].items():
                if field in data:
                    expected_type = field_schema.get('type')
                    if expected_type:
                        actual_type = type(data[field]).__name__
                        if actual_type != expected_type:
                            logger.error(f"Field {field} should be {expected_type}, got {actual_type}")
                            return False

        return True

    except Exception as e:
        logger.error(f"Schema validation error: {e}")
        return False


# ===================================================================================
# JSON METADATA & INFO
# ===================================================================================

def get_json_metadata(file_path: Union[str, Path]) -> Dict[str, Any]:
    """
    Get metadata about JSON file without loading entire content.

    Args:
        file_path: Path to JSON file

    Returns:
        Dictionary with file metadata
    """
    path = Path(file_path)

    if not path.exists():
        return {"error": "File not found"}

    stats = path.stat()

    metadata = {
        "file_path": str(path),
        "file_size_bytes": stats.st_size,
        "file_size_mb": round(stats.st_size / (1024 * 1024), 2),
        "modified_time": datetime.fromtimestamp(stats.st_mtime).isoformat(),
        "is_compressed": path.suffix == '.gz'
    }

    # Try to count items without loading full file
    try:
        if path.suffix == '.gz':
            with gzip.open(path, 'rt') as f:
                first_char = f.read(1)
                f.seek(0)
                if first_char == '[':
                    # Count array items using ijson
                    parser = ijson.items(f, 'item')
                    count = sum(1 for _ in parser)
                    metadata["estimated_item_count"] = count
        else:
            with open(path, 'r') as f:
                first_char = f.read(1)
                f.seek(0)
                if first_char == '[':
                    parser = ijson.items(f, 'item')
                    count = sum(1 for _ in parser)
                    metadata["estimated_item_count"] = count
    except Exception as e:
        metadata["estimated_item_count"] = "Unknown"
        logger.debug(f"Could not count items: {e}")

    return metadata


# ===================================================================================
# WRITE JSON FUNCTIONS
# ===================================================================================

def write_json_file(
        data: Any,
        file_path: Union[str, Path],
        pretty: bool = True,
        compress: bool = False
) -> bool:
    """
    Write data to JSON file.

    Args:
        data: Data to write (dict, list, etc.)
        file_path: Output file path
        pretty: Pretty print with indentation
        compress: Compress output as .gz

    Returns:
        True if successful, False otherwise
    """
    path = Path(file_path)

    # Add .gz extension if compressing
    if compress and path.suffix != '.gz':
        path = path.with_suffix(path.suffix + '.gz')

    try:
        # Create parent directories if needed
        path.parent.mkdir(parents=True, exist_ok=True)

        indent = 2 if pretty else None

        if compress:
            with gzip.open(path, 'wt', encoding='utf-8') as f:
                json.dump(data, f, cls=CustomJSONEncoder, indent=indent)
        else:
            with open(path, 'w', encoding='utf-8') as f:
                json.dump(data, f, cls=CustomJSONEncoder, indent=indent)

        logger.info(f"Successfully wrote JSON to {path}")
        return True

    except Exception as e:
        logger.error(f"Failed to write JSON to {path}: {e}")
        return False


def write_json_lines(data: List[Dict], file_path: Union[str, Path]) -> bool:
    """
    Write data as JSON Lines format (one JSON per line).

    Args:
        data: List of dictionaries
        file_path: Output file path (.jsonl recommended)

    Returns:
        True if successful, False otherwise
    """
    path = Path(file_path)

    try:
        path.parent.mkdir(parents=True, exist_ok=True)

        with open(path, 'w', encoding='utf-8') as f:
            for item in data:
                f.write(json.dumps(item, cls=CustomJSONEncoder) + '\n')

        logger.info(f"Successfully wrote {len(data)} lines to {path}")
        return True

    except Exception as e:
        logger.error(f"Failed to write JSON Lines to {path}: {e}")
        return False


# ===================================================================================
# CONVENIENCE FUNCTIONS FOR SPIRIX SPECIFIC DATA
# ===================================================================================

def read_config_json(config_name: str) -> Dict:
    """
    Read configuration JSON from app/config directory.

    Args:
        config_name: Name of config file (without .json)

    Returns:
        Configuration dictionary
    """
    config_path = Path(__file__).parent.parent / "config" / f"{config_name}.json"
    return read_json_file(config_path)


def read_spirix_data_file(data_type: str, date: datetime) -> Dict:
    """
    Read Spirix data file organized by type and date.

    Args:
        data_type: Type of data (e.g., 'sales', 'inventory', 'analytics')
        date: Date of the data file

    Returns:
        Data dictionary
    """
    file_path = Path(f"/data/spirix/{data_type}/{date.year}/{date.month:02d}/{date.day:02d}/data.json")
    return read_json_file(file_path)


def merge_json_files(file_paths: List[Union[str, Path]], output_path: Union[str, Path]) -> Dict:
    """
    Merge multiple JSON files into one.

    Args:
        file_paths: List of JSON file paths
        output_path: Output merged file path

    Returns:
        Merged dictionary
    """
    merged_data = {}

    for file_path in file_paths:
        data = read_json_file(file_path)
        merged_data.update(data)

    write_json_file(merged_data, output_path)
    return merged_data


# ===================================================================================
# FASTAPI ENDPOINT HELPER
# ===================================================================================

async def parse_json_upload(file_content: bytes, filename: str) -> Dict:
    """
    Parse uploaded JSON file content.
    Use this in FastAPI upload endpoints.

    Args:
        file_content: Bytes from uploaded file
        filename: Original filename

    Returns:
        Parsed JSON data

    Raises:
        HTTPException: If JSON is invalid
    """
    try:
        # Check if compressed
        if filename.endswith('.gz'):
            import gzip
            content = gzip.decompress(file_content)
            return json.loads(content.decode('utf-8'))
        else:
            return json.loads(file_content.decode('utf-8'))
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=400, detail=f"Invalid JSON: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse JSON: {str(e)}")


# ===================================================================================
# USAGE EXAMPLES
# ===================================================================================

if __name__ == "__main__":
    # Example 1: Read simple JSON
    data = read_json_file_safe("config.json", default={})
    print(f"Config: {data}")

    # Example 2: Stream large JSON array (memory efficient)
    # for item in stream_json_array("large_sales_data.json"):
    #     print(f"Processing: {item['transaction_id']}")

    # Example 3: Write JSON with custom encoder
    test_data = {
        "name": "Spirix",
        "created_at": datetime.now(),
        "revenue": Decimal("12345.67")
    }
    write_json_file(test_data, "output.json", pretty=True)

    # Example 4: Read JSON Lines
    # records = read_json_lines("sales_data.jsonl")

    # Example 5: Get file metadata
    metadata = get_json_metadata("config.json")
    print(f"File info: {metadata}")