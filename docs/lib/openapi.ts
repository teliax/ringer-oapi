import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const OPENAPI_DIR = path.join(process.cwd(), '..', 'openapi');

/**
 * Loads and parses an OpenAPI specification file
 * @param category - The category folder (e.g., 'ringer', 'ringer-business')
 * @param specName - The specification file name without extension (e.g., 'telique')
 * @returns The parsed OpenAPI specification as a JavaScript object
 */
export function loadOpenApiSpec(category: string, specName: string) {
  const filePath = path.join(OPENAPI_DIR, category, `${specName}.yaml`);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return yaml.load(fileContent);
  } catch (error) {
    console.error(`Error loading OpenAPI spec: ${filePath}`, error);
    return null;
  }
}

/**
 * Gets all available OpenAPI specifications
 * @returns An array of available specs with their categories
 */
export function getAllOpenApiSpecs() {
  const specs: Array<{ category: string; name: string }> = [];
  
  try {
    const categories = fs.readdirSync(OPENAPI_DIR).filter(file => 
      fs.statSync(path.join(OPENAPI_DIR, file)).isDirectory()
    );
    
    for (const category of categories) {
      const categoryPath = path.join(OPENAPI_DIR, category);
      const files = fs.readdirSync(categoryPath).filter(file => 
        file.endsWith('.yaml') || file.endsWith('.yml')
      );
      
      for (const file of files) {
        specs.push({
          category,
          name: path.basename(file, path.extname(file))
        });
      }
    }
  } catch (error) {
    console.error('Error getting all OpenAPI specs', error);
  }
  
  return specs;
}

/**
 * Gets all paths from an OpenAPI specification
 * @param spec - The OpenAPI specification object
 * @returns An array of path objects with method, path, and summary
 */
export function getPathsFromSpec(spec: any) {
  if (!spec || !spec.paths) return [];
  
  const paths: Array<{ method: string; path: string; summary: string; operationId: string }> = [];
  
  Object.entries(spec.paths).forEach(([path, pathItem]: [string, any]) => {
    const methods = ['get', 'post', 'put', 'delete', 'patch'];
    
    methods.forEach(method => {
      if (pathItem[method]) {
        paths.push({
          method,
          path,
          summary: pathItem[method].summary || '',
          operationId: pathItem[method].operationId || '',
        });
      }
    });
  });
  
  return paths;
}

/**
 * Gets endpoint details from an OpenAPI specification
 * @param spec - The OpenAPI specification object
 * @param path - The endpoint path
 * @param method - The HTTP method
 * @returns The endpoint details
 */
export function getEndpointDetails(spec: any, path: string, method: string) {
  if (!spec || !spec.paths || !spec.paths[path] || !spec.paths[path][method.toLowerCase()]) {
    return null;
  }
  
  return spec.paths[path][method.toLowerCase()];
} 