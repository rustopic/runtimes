#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load schemas
const manifestSchema = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'schemas', 'manifest.schema.json'), 'utf8')
);
const indexSchema = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'schemas', 'index.schema.json'), 'utf8')
);

// Initialize AJV
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

// Compile validators
const validateManifest = ajv.compile(manifestSchema);
const validateIndex = ajv.compile(indexSchema);

let hasErrors = false;

// Validate manifest.yml
console.log('Validating manifest.yml...');
try {
  const manifestContent = fs.readFileSync(path.join(rootDir, 'manifest.yml'), 'utf8');
  const manifest = yaml.load(manifestContent);
  
  if (!validateManifest(manifest)) {
    console.error('❌ manifest.yml validation failed:');
    validateManifest.errors.forEach(err => {
      console.error(`  - ${err.instancePath || '/'}: ${err.message}`);
    });
    hasErrors = true;
  } else {
    console.log('✅ manifest.yml is valid');
  }
} catch (error) {
  console.error(`❌ Error reading/parsing manifest.yml: ${error.message}`);
  hasErrors = true;
}

// Validate index.yml
console.log('\nValidating index.yml...');
try {
  const indexContent = fs.readFileSync(path.join(rootDir, 'index.yml'), 'utf8');
  const index = yaml.load(indexContent);
  
  if (!validateIndex(index)) {
    console.error('❌ index.yml validation failed:');
    validateIndex.errors.forEach(err => {
      console.error(`  - ${err.instancePath || '/'}: ${err.message}`);
    });
    hasErrors = true;
  } else {
    console.log('✅ index.yml is valid');
    
    // Additional validation: check for duplicate IDs
    const ids = index.images.map(img => img.id);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicates.length > 0) {
      console.error(`❌ Duplicate image IDs found: ${duplicates.join(', ')}`);
      hasErrors = true;
    } else {
      console.log('✅ No duplicate image IDs');
    }
    
    // Check for duplicate images
    const images = index.images.map(img => img.image);
    const duplicateImages = images.filter((img, index) => images.indexOf(img) !== index);
    if (duplicateImages.length > 0) {
      console.error(`❌ Duplicate image references found: ${duplicateImages.join(', ')}`);
      hasErrors = true;
    } else {
      console.log('✅ No duplicate image references');
    }
  }
} catch (error) {
  console.error(`❌ Error reading/parsing index.yml: ${error.message}`);
  hasErrors = true;
}

// Exit with appropriate code
process.exit(hasErrors ? 1 : 0);

