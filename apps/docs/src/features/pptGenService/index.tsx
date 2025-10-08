import PageLayout from "@/components/PageLayout";
import Markdown from "@/lyfe-shared/Markdown";
import React from "react";

const PPTGenService: React.FC = () => {
  const content = `# Frontend HTML Structure Guide for PPT Generation

This guide explains how to properly structure HTML content for the PPT generation API to ensure optimal slide extraction and conversion to PowerPoint presentations.

## 📋 Overview

The PPT generation system uses Puppeteer to render HTML content and extract presentation elements. It looks for a specific HTML structure with slides and converts them into PowerPoint-compatible elements.

## 🏗️ Required HTML Structure

### 1. Main Container

Your HTML must include a container with the ID \`presentation-slides-wrapper\`:

\`\`\`html
<div id="presentation-slides-wrapper">
  <!-- Your slides go here -->
</div>
\`\`\`

### 2. Slide Structure

Each slide must be wrapped in a specific structure:

\`\`\`html
<div id="presentation-slides-wrapper">
  <div>
    <div>
      <!-- Slide 1 content -->
    </div>
  </div>
  <div>
    <div>
      <!-- Slide 2 content -->
    </div>
  </div>
</div>
\`\`\`

⚠️ **Important**: The system looks for \`:scope > div > div\` elements within the slides wrapper, so each slide must be nested exactly two levels deep.

## 🔍 Element Extraction Process

### How Slides Are Detected

1. **Wrapper Detection**: The system finds \`#presentation-slides-wrapper\`
2. **Slide Extraction**: It looks for direct children with the pattern \`div > div\`
3. **Element Processing**: Each slide's child elements are processed recursively

### Element Types and Conversion

The system converts HTML elements into PowerPoint shapes based on their properties:

#### 1. Text Elements

- **HTML**: Any element with text content
- **PowerPoint**: TextBox or AutoShapeBox
- **Requirements**: Must have \`innerText\` or text content

\`\`\`html
<div style="position: absolute; left: 100px; top: 100px; width: 400px; height: 200px;">
  Hello World!
</div>
\`\`\`

#### 2. Image Elements

- **HTML**: \`<img>\` tags or elements with \`imageSrc\`
- **PowerPoint**: PictureBox
- **Requirements**: Must have \`src\` attribute or background-image

\`\`\`html
<img 
  src="image.jpg" 
  style="position: absolute; left: 200px; top: 200px; width: 300px; height: 200px;" 
/>
\`\`\`

#### 3. Shape Elements

- **HTML**: Elements with background colors and/or borders
- **PowerPoint**: AutoShapeBox
- **Requirements**: Must have visual properties (background, border, shadow)

\`\`\`html
<div style="position: absolute; left: 50px; top: 50px; width: 200px; height: 100px; background-color: #ff0000; border-radius: 10px;"></div>
\`\`\`

#### 4. Connector Elements

- **HTML**: \`<hr>\` tags
- **PowerPoint**: Connector
- **Requirements**: Must be an \`<hr>\` element

\`\`\`html
<hr style="position: absolute; left: 100px; top: 300px; width: 400px; height: 2px; border: none; background-color: #000000;" />
\`\`\`

## 📐 Positioning and Sizing

### Absolute Positioning Required

All elements must use absolute positioning for accurate placement:

\`\`\`css
position: absolute;
left: 100px;    /* Distance from left edge */
top: 100px;     /* Distance from top edge */
width: 400px;   /* Element width */
height: 200px;  /* Element height */
\`\`\`

### Coordinate System

- **Origin**: Top-left corner of each slide
- **Units**: Pixels (px)
- **Canvas Size**: 1280x720 pixels (16:9 aspect ratio)
- **Coordinate Range**:
  - X: 0 to 1280
  - Y: 0 to 720

### Size Constraints

#### Minimum Sizes

| Element Type | Min Width | Min Height |
|-------------|-----------|------------|
| Text Elements | 20px | 16px |
| Images | 10px | 10px |
| Shapes | 10px | 10px |

#### Maximum Sizes

| Property | Maximum Value |
|----------|--------------|
| Slide Width | 1280px |
| Slide Height | 720px |
| Element Width | ≤ slide width |
| Element Height | ≤ slide height |

## 🎨 Styling Guidelines

### ⚠️ CRITICAL: Use Raw Inline CSS Only

**All CSS must be inline styles!** The system does not process external stylesheets, Tailwind classes, or \`<style>\` blocks. Every element must have its styling defined using the \`style\` attribute.

\`\`\`html
<!-- ✅ CORRECT: Inline styles -->
<div style="position: absolute; left: 100px; top: 100px; width: 400px; height: 200px; background-color: #ff0000;">
  Content here
</div>

<!-- ❌ INCORRECT: External CSS -->
<div class="my-element">Content here</div>
<style>
  .my-element {
    position: absolute;
  }
</style>

<!-- ❌ INCORRECT: Tailwind classes -->
<div class="absolute left-[100px] top-[100px] w-[400px] h-[200px] bg-red-500">
  Content here
</div>

<!-- ❌ INCORRECT: Style blocks -->
<div style="position: absolute;">
  <style>
    background-color: #ff0000;
  </style>
</div>
\`\`\`

## 📝 Complete Example

Here's a complete example of a valid presentation structure:

\`\`\`html
<div id="presentation-slides-wrapper">
  <!-- Slide 1: Title Slide -->
  <div>
    <div>
      <!-- Background -->
      <div style="position: absolute; left: 0; top: 0; width: 1280px; height: 720px; background-color: #1e3a8a;"></div>
      
      <!-- Title -->
      <div style="position: absolute; left: 100px; top: 250px; width: 1080px; height: 100px; color: #ffffff; font-size: 48px; font-weight: bold; text-align: center;">
        My Presentation Title
      </div>
      
      <!-- Subtitle -->
      <div style="position: absolute; left: 100px; top: 380px; width: 1080px; height: 50px; color: #e5e7eb; font-size: 24px; text-align: center;">
        A comprehensive guide to PPT generation
      </div>
    </div>
  </div>
  
  <!-- Slide 2: Content Slide -->
  <div>
    <div>
      <!-- Background -->
      <div style="position: absolute; left: 0; top: 0; width: 1280px; height: 720px; background-color: #ffffff;"></div>
      
      <!-- Header -->
      <div style="position: absolute; left: 80px; top: 60px; width: 1120px; height: 80px; color: #1e3a8a; font-size: 36px; font-weight: bold;">
        Key Features
      </div>
      
      <!-- Divider -->
      <hr style="position: absolute; left: 80px; top: 150px; width: 1120px; height: 2px; border: none; background-color: #1e3a8a;" />
      
      <!-- Content Box -->
      <div style="position: absolute; left: 120px; top: 200px; width: 1040px; height: 400px; color: #374151; font-size: 20px; line-height: 1.6;">
        <div style="position: absolute; left: 0; top: 0; width: 100%; height: auto;">
          • Easy to use HTML structure
        </div>
        <div style="position: absolute; left: 0; top: 50px; width: 100%; height: auto;">
          • Supports text, images, and shapes
        </div>
        <div style="position: absolute; left: 0; top: 100px; width: 100%; height: auto;">
          • Precise positioning with absolute coordinates
        </div>
        <div style="position: absolute; left: 0; top: 150px; width: 100%; height: auto;">
          • Converts to PowerPoint format
        </div>
      </div>
    </div>
  </div>
  
  <!-- Slide 3: Image Slide -->
  <div>
    <div>
      <!-- Background -->
      <div style="position: absolute; left: 0; top: 0; width: 1280px; height: 720px; background-color: #f3f4f6;"></div>
      
      <!-- Title -->
      <div style="position: absolute; left: 80px; top: 60px; width: 1120px; height: 60px; color: #1e3a8a; font-size: 32px; font-weight: bold;">
        Visual Content
      </div>
      
      <!-- Image (replace with your image URL) -->
      <img 
        src="https://via.placeholder.com/800x400" 
        style="position: absolute; left: 240px; top: 160px; width: 800px; height: 400px; border-radius: 8px;" 
      />
    </div>
  </div>
</div>
\`\`\`

## 🚀 API Integration

The PPT generation system consists of two backend services that work together to convert your HTML content into downloadable PowerPoint presentations.

### 📋 Two-Step Process

1. **Create your presentations** according to the provided HTML structure guidelines
2. **Extract the HTML** and hit the API endpoint to get the downloadable PPT

### 🌐 API Endpoints

#### Express Server
**Base URL:** \`https://hitachi-ppt-express.ca.lyzr.app\`

#### FastAPI Server  
**Base URL:** \`https://hitachi-fast-server.ca.lyzr.app\`

### 🎯 Primary API Endpoint (Recommended)

#### Convert HTML to PPTX (Direct Download)
- **POST** \`/api/convert-to-pptx\`
- **Base URL:** \`https://hitachi-ppt-express.ca.lyzr.app\`
- **Content-Type:** \`text/html\`
- **Request Body:** Raw HTML content as string
- **Response:** Binary PowerPoint file with \`Content-Disposition: attachment; filename="presentation.pptx"\`

**This is the main endpoint you'll use for PPT generation. It accepts your HTML content and directly returns a downloadable PowerPoint file.**

### 📚 Additional API Endpoints (Reference)

#### Express Server Endpoints

##### Health Check
- **GET** \`/api/health\`
- **Response:** \`{"status": "healthy", "timestamp": "2024-01-15T10:30:00.000Z"}\`

##### HTML to Presentation Model
- **POST** \`/api/html-to-presentation-model\`
- **Content-Type:** \`text/html\`
- **Request Body:** Raw HTML content as string
- **Response:** JSON with slides structure

#### FastAPI Server Endpoints

##### Health Check
- **GET** \`/health\`
- **Response:** \`{"status": "healthy"}\`

##### Root Information
- **GET** \`/\`
- **Response:** \`{"message": "PPT Generator API", "version": "1.0.0"}\`

##### API Documentation
- **GET** \`/docs\` - Interactive Swagger UI
- **GET** \`/redoc\` - Alternative ReDoc documentation

##### Download Presentation as PPTX
- **POST** \`/api/v1/ppt/presentation/download/pptx\`
- **Content-Type:** \`application/json\`
- **Request Body:** JSON with slides structure
- **Response:** Binary PowerPoint file with \`Content-Disposition: attachment\`

### Step 1: Extract the HTML Content

Use JavaScript to get the HTML content of your presentation wrapper:

\`\`\`javascript
// Get the presentation HTML
const presentationElement = document.getElementById('presentation-slides-wrapper');
const htmlContent = presentationElement.outerHTML;

console.log('HTML Content:', htmlContent);
\`\`\`

### Step 2: Send to API (Recommended - Direct Conversion)

Send the HTML content directly to the primary API endpoint for immediate PPTX download:

\`\`\`javascript
async function generatePPT() {
  try {
    // Get the presentation HTML
    const presentationElement = document.getElementById('presentation-slides-wrapper');
    
    if (!presentationElement) {
      throw new Error('Presentation wrapper not found');
    }
    
    const htmlContent = presentationElement.outerHTML;
    
    // Primary API endpoint for direct conversion
    const apiEndpoint = 'https://hitachi-ppt-express.ca.lyzr.app/api/convert-to-pptx';
    
    // Send POST request with HTML content
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/html',
      },
      body: htmlContent,
    });
    
    if (!response.ok) {
      throw new Error(\`API error: \${response.status} \${response.statusText}\`);
    }
    
    // Get the file blob
    const blob = await response.blob();
    
    // Download the file
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'presentation.pptx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    console.log('✅ PPT generated successfully!');
  } catch (error) {
    console.error('❌ Error generating PPT:', error);
  }
}
\`\`\`

### 🔧 Advanced: Two-Step Process (Optional)

For advanced use cases where you need more control over the conversion process, you can use the two-step approach:

\`\`\`javascript
async function generatePPTTwoStep() {
  try {
    // Step 1: Convert HTML to presentation model
    const presentationElement = document.getElementById('presentation-slides-wrapper');
    const htmlContent = presentationElement.outerHTML;
    
    const modelResponse = await fetch('https://hitachi-ppt-express.ca.lyzr.app/api/html-to-presentation-model', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/html',
      },
      body: htmlContent,
    });
    
    if (!modelResponse.ok) {
      throw new Error(\`Model conversion error: \${modelResponse.status}\`);
    }
    
    const presentationModel = await modelResponse.json();
    
    // Step 2: Generate PPTX from model
    const pptxResponse = await fetch('https://hitachi-fast-server.ca.lyzr.app/api/v1/ppt/presentation/download/pptx', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(presentationModel),
    });
    
    if (!pptxResponse.ok) {
      throw new Error(\`PPTX generation error: \${pptxResponse.status}\`);
    }
    
    // Download the file
    const blob = await pptxResponse.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'presentation.pptx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    console.log('✅ PPT generated successfully!');
  } catch (error) {
    console.error('❌ Error generating PPT:', error);
  }
}
\`\`\`

### Step 3: React Example with Button

Here's a complete React component example using the primary API endpoint:

\`\`\`tsx
import React, { useState } from 'react';

const PPTGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePPT = async () => {
    setIsGenerating(true);
    
    try {
      const presentationElement = document.getElementById('presentation-slides-wrapper');
      
      if (!presentationElement) {
        throw new Error('Presentation wrapper not found');
      }
      
      const htmlContent = presentationElement.outerHTML;
      
      // Use the primary API endpoint for direct conversion
      const response = await fetch('https://hitachi-ppt-express.ca.lyzr.app/api/convert-to-pptx', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/html',
        },
        body: htmlContent,
      });
      
      if (!response.ok) {
        throw new Error(\`API error: \${response.status}\`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'presentation.pptx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      alert('✅ Presentation generated successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Failed to generate presentation');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      {/* Your presentation structure */}
      <div id="presentation-slides-wrapper">
        {/* ... slides go here ... */}
      </div>
      
      {/* Generate button */}
      <button 
        onClick={handleGeneratePPT}
        disabled={isGenerating}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#1e3a8a',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          cursor: isGenerating ? 'not-allowed' : 'pointer',
          marginTop: '20px',
        }}
      >
        {isGenerating ? 'Generating...' : 'Generate PowerPoint'}
      </button>
    </div>
  );
};

export default PPTGenerator;
\`\`\`

## ✅ Best Practices

| Practice | Description |
|----------|-------------|
| **Use Absolute Positioning** | Always use \`position: absolute\` with \`left\`, \`top\`, \`width\`, and \`height\` |
| **Inline Styles Only** | No external CSS, Tailwind classes, or style blocks |
| **Correct Nesting** | Maintain the two-level nesting: \`#wrapper > div > div\` |
| **Proper Sizing** | Respect minimum and maximum size constraints |
| **Standard Canvas** | Design for 1280x720px (16:9 aspect ratio) |
| **Valid HTML** | Ensure all tags are properly closed and nested |
| **Image URLs** | Use absolute URLs for images (http:// or https://) |
| **Font Sizes** | Use pixel values for font sizes (e.g., \`font-size: 24px\`) |
| **Colors** | Use hex codes or RGB/RGBA for colors |

## ❌ Common Mistakes to Avoid

| Mistake | Issue | Solution |
|---------|-------|----------|
| Using Tailwind classes | Classes are not processed | Use inline styles instead |
| Missing wrapper ID | System can't find slides | Always use \`id="presentation-slides-wrapper"\` |
| Wrong nesting depth | Slides not detected | Maintain exact two-level nesting |
| Relative positioning | Elements misplaced | Use \`position: absolute\` |
| External stylesheets | Styles not applied | Use inline \`style\` attribute |
| Relative image paths | Images not found | Use absolute URLs for images |
| Missing dimensions | Elements not rendered | Always specify width and height |
| Elements outside canvas | Content cut off | Keep all elements within 1280x720px |

## 🔧 Troubleshooting

### Issue: Slides Not Detected

**Cause**: Incorrect HTML structure or missing wrapper ID

**Solution**: Verify your structure matches:
\`\`\`html
<div id="presentation-slides-wrapper">
  <div>
    <div>
      <!-- Slide content -->
    </div>
  </div>
</div>
\`\`\`

### Issue: Styles Not Applied

**Cause**: Using CSS classes or external styles

**Solution**: Convert all styles to inline:
\`\`\`html
<!-- Before -->
<div class="text-blue-500">Text</div>

<!-- After -->
<div style="color: #3b82f6;">Text</div>
\`\`\`

### Issue: Elements Mispositioned

**Cause**: Not using absolute positioning

**Solution**: Always use absolute positioning with coordinates:
\`\`\`html
<div style="position: absolute; left: 100px; top: 100px; width: 400px; height: 200px;">
  Content
</div>
\`\`\`

### Issue: Images Not Showing

**Cause**: Using relative image paths

**Solution**: Use absolute URLs:
\`\`\`html
<!-- Before -->
<img src="./images/photo.jpg" />

<!-- After -->
<img src="https://yourdomain.com/images/photo.jpg" />
\`\`\`

## 📚 Summary

Follow these key principles for successful PPT generation:

1. ✅ Use the required HTML structure with \`presentation-slides-wrapper\` ID
2. ✅ Maintain proper two-level nesting for each slide
3. ✅ Apply all styles inline using the \`style\` attribute
4. ✅ Use absolute positioning for all elements
5. ✅ Design for 1280x720px canvas size
6. ✅ Extract HTML and send to the Express server API endpoint
7. ✅ Handle API response and download the generated file

### 🎯 Quick Start Flow

1. **Create HTML Structure**: Build your presentation using the HTML guidelines above
2. **Extract HTML**: Get the HTML content from \`#presentation-slides-wrapper\`
3. **Call Primary API**: Send HTML to \`https://hitachi-ppt-express.ca.lyzr.app/api/convert-to-pptx\`
4. **Download**: Handle the binary response and trigger file download

### 🔗 API Services

- **Primary Endpoint**: \`https://hitachi-ppt-express.ca.lyzr.app/api/convert-to-pptx\` - Direct HTML to PPTX conversion
- **Express Server**: \`https://hitachi-ppt-express.ca.lyzr.app\` - HTML processing and direct conversion
- **FastAPI Server**: \`https://hitachi-fast-server.ca.lyzr.app\` - PowerPoint generation from models (advanced use cases)

Following this guide ensures your HTML content will be properly converted into a professional PowerPoint presentation using the production-ready API services.`;

  return (
    <PageLayout
      breadcrumbs={[{ name: "PPT Generation Guide", path: "/ppt-generation" }]}
    >
      <div className="container relative">
        <div className="mx-auto flex max-w-[980px] flex-col items-start gap-2 md:flex-row md:justify-between md:gap-12">
          <Markdown>{content}</Markdown>
        </div>
      </div>
    </PageLayout>
  );
};

export default PPTGenService;
