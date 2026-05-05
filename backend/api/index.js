cat > backend/api/index.js << 'EOF'
const app = require('../server');

module.exports = (req, res) => {
  app(req, res);
};
EOF