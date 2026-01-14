#!/bin/bash
# Quick verification script for Chinar Charity Foundation website

echo "🔍 Chinar Charity Foundation - Website Verification"
echo "=================================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo -n "Checking Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Found: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found. Please install Node.js first."
    exit 1
fi

# Check npm
echo -n "Checking npm... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} Found: v$NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found. Please install npm first."
    exit 1
fi

# Check package.json
echo -n "Checking package.json... "
if [ -f "package.json" ]; then
    echo -e "${GREEN}✓${NC} Found"
else
    echo -e "${RED}✗${NC} Not found"
    exit 1
fi

# Check .env file
echo -n "Checking .env file... "
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} Found"
    
    # Check if email is configured
    if grep -q "your-email@gmail.com" .env; then
        echo -e "${YELLOW}  ⚠ Email not configured (using default values)${NC}"
        echo -e "${YELLOW}  ℹ Website will work, but form submissions will be logged to console${NC}"
    else
        echo -e "${GREEN}  ✓ Email appears to be configured${NC}"
    fi
else
    echo -e "${YELLOW}⚠${NC} Not found. Creating from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${GREEN}  ✓ Created .env file${NC}"
    else
        echo -e "${RED}  ✗ .env.example not found${NC}"
        exit 1
    fi
fi

# Check logo
echo -n "Checking logo... "
if [ -f "public/images/logo.png" ]; then
    SIZE=$(ls -lh public/images/logo.png | awk '{print $5}')
    echo -e "${GREEN}✓${NC} Found ($SIZE)"
else
    echo -e "${YELLOW}⚠${NC} Not found. Will use fallback."
fi

# Check favicon
echo -n "Checking favicon... "
if [ -f "public/favicon.ico" ]; then
    SIZE=$(ls -lh public/favicon.ico | awk '{print $5}')
    echo -e "${GREEN}✓${NC} Found ($SIZE)"
else
    echo -e "${YELLOW}⚠${NC} Not found. Run 'python3 create-logo.py' to create it."
fi

# Check required directories
echo -n "Checking required directories... "
REQUIRED_DIRS=("public" "routes" "views" "views/partials")
MISSING_DIRS=0
for dir in "${REQUIRED_DIRS[@]}"; do
    if [ ! -d "$dir" ]; then
        echo -e "${RED}✗${NC} Missing: $dir"
        MISSING_DIRS=$((MISSING_DIRS + 1))
    fi
done
if [ $MISSING_DIRS -eq 0 ]; then
    echo -e "${GREEN}✓${NC} All present"
fi

# Check node_modules
echo -n "Checking node_modules... "
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Found"
else
    echo -e "${YELLOW}⚠${NC} Not found. Run 'npm install' to install dependencies."
fi

# Check critical files
echo -n "Checking critical files... "
CRITICAL_FILES=("server.js" "routes/main.js" "public/js/main.js" "public/css/style.css" "views/index.ejs")
MISSING_FILES=0
for file in "${CRITICAL_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo -e "${RED}✗${NC} Missing: $file"
        MISSING_FILES=$((MISSING_FILES + 1))
    fi
done
if [ $MISSING_FILES -eq 0 ]; then
    echo -e "${GREEN}✓${NC} All present"
fi

echo ""
echo "=================================================="

# Final status
if [ $MISSING_DIRS -eq 0 ] && [ $MISSING_FILES -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed!${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Run 'npm install' (if not already done)"
    echo "  2. Run 'npm start' to start the server"
    echo "  3. Visit http://localhost:3000"
    echo ""
    echo "Optional:"
    echo "  - Edit .env to configure email"
    echo "  - Replace public/images/logo.png with your logo"
    echo "  - Run 'python3 create-logo.py' to regenerate favicon"
    echo ""
    echo "For detailed setup instructions, see SETUP_GUIDE.md"
else
    echo -e "${RED}❌ Some checks failed. Please fix the issues above.${NC}"
    exit 1
fi
