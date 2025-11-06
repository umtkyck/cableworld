# Contributing to CableWorld

Thank you for considering contributing to CableWorld! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Collaborate openly

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Docker (optional)

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/cableworld.git
   cd cableworld
   ```

3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/umtkyck/cableworld.git
   ```

4. Install dependencies:
   ```bash
   # Website
   cd website && npm install

   # Mobile
   cd mobile && npm install

   # Backend
   cd backend && npm install
   ```

## 💻 Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions or fixes

### 2. Make Changes

- Write clean, readable code
- Follow coding standards (below)
- Add tests for new features
- Update documentation

### 3. Test Your Changes

```bash
# Website
cd website && npm test

# Mobile
cd mobile && npm test

# Backend
cd backend && npm test
```

### 4. Commit Your Changes

Follow our commit message guidelines (below).

```bash
git add .
git commit -m "feat: add new feature"
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

- Go to the original repository
- Click "New Pull Request"
- Select your branch
- Fill in PR template
- Request review

## 🔄 Pull Request Process

### PR Requirements

- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No merge conflicts
- [ ] Reviewed by at least one maintainer

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test the changes

## Screenshots (if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
```

## 📝 Coding Standards

### General

- Use TypeScript for all new code
- Write self-documenting code
- Add comments for complex logic
- Keep functions small and focused
- Follow DRY principle

### TypeScript/JavaScript

```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

function getUserById(id: string): User | null {
  // Implementation
}

// Bad
function getUser(x: any): any {
  // Implementation
}
```

### React/React Native

```tsx
// Good - Functional components with TypeScript
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export function Button({ title, onPress, disabled = false }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
```

### File Naming

- Components: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Constants: `UPPER_SNAKE_CASE.ts` (e.g., `API_CONSTANTS.ts`)

### Folder Structure

```
feature/
├── components/        # Feature-specific components
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── types.ts          # TypeScript types
└── index.ts          # Public API
```

## 📜 Commit Messages

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Test additions or updates
- `chore` - Build process or tool changes

### Examples

```bash
feat(quote): add real-time quote generation

Implemented instant quote generation using AI parsing
and supplier API integration. Quote time reduced to < 60s.

Closes #123

---

fix(auth): resolve login token expiration issue

Fixed bug where tokens expired prematurely causing
unexpected logouts.

Fixes #456

---

docs(api): update API integration documentation

Added examples for Digikey and Mouser API integration.
```

### Rules

- Use imperative mood ("add" not "added")
- Keep subject line under 50 characters
- Capitalize first letter
- No period at the end of subject
- Separate subject from body with blank line
- Wrap body at 72 characters
- Reference issues in footer

## 🧪 Testing Guidelines

### Unit Tests

- Test individual functions/components
- Mock external dependencies
- Aim for 80%+ coverage

```typescript
describe('formatPrice', () => {
  it('should format USD correctly', () => {
    expect(formatPrice(1234.56, 'USD')).toBe('$1,234.56');
  });
});
```

### Integration Tests

- Test feature workflows
- Use realistic data
- Test error cases

### E2E Tests

- Test critical user journeys
- Quote generation flow
- Order placement flow
- Payment flow

## 📖 Documentation

### Code Documentation

```typescript
/**
 * Calculates the total price for a cable harness order
 *
 * @param components - Array of components in the harness
 * @param quantity - Number of units to manufacture
 * @param options - Additional pricing options
 * @returns Total price in USD
 */
function calculateTotalPrice(
  components: Component[],
  quantity: number,
  options: PricingOptions
): number {
  // Implementation
}
```

### README Updates

Update relevant README files when:
- Adding new features
- Changing setup process
- Adding dependencies
- Updating configurations

## ❓ Questions?

- Create an issue for bugs
- Start a discussion for questions
- Join our Discord (coming soon)
- Email: dev@cableworld.com

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to CableWorld! 🎉
