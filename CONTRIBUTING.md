# Contributing to ZORRO Quantitative Trading System

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

---

## 🎯 Ways to Contribute

### 1. Report Bugs
- Found a bug? Open an issue on GitHub
- Include: description, steps to reproduce, expected vs actual behavior
- Attach error logs and environment details

### 2. Suggest Features
- Have an idea for improvement? Open a discussion or issue
- Explain the feature and why it would be useful
- Link to related issues if applicable

### 3. Improve Documentation
- Fix typos or unclear passages
- Add examples or clarifications
- Improve guides or tutorials
- Translate documentation

### 4. Submit Code
- Create new strategies
- Improve existing code
- Optimize performance
- Add tests
- Fix bugs

### 5. Help Others
- Answer questions in discussions
- Provide feedback on pull requests
- Share your experience and learning
- Create tutorials or blog posts

---

## 🔄 Contribution Process

### Step 1: Fork the Repository
```bash
# Fork on GitHub (button on repository page)
# Then clone your fork locally
git clone https://github.com/YOUR_USERNAME/zorro-quantitative-trading.git
cd zorro-quantitative-trading
```

### Step 2: Create a Branch
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description

# Or for documentation
git checkout -b docs/documentation-update
```

### Step 3: Make Changes
- Code quality matters
- Follow existing patterns
- Write clear commit messages
- Include comments for complex logic
- Test your changes thoroughly

### Step 4: Commit Changes
```bash
# Make atomic commits (one logical change per commit)
git add specific-files
git commit -m "Clear, descriptive commit message"

# Example:
# git commit -m "Add Z2+ variant for GBP/JPY pair"
# git commit -m "Fix: prevent division by zero in Sharpe calculation"
# git commit -m "Docs: add parameter optimization guide"
```

### Step 5: Push and Create PR
```bash
# Push to your fork
git push origin feature/your-feature-name

# Create Pull Request on GitHub
# Include:
# - Clear title and description
# - Reference related issues
# - Explain why this change is needed
# - Note any breaking changes
```

### Step 6: Code Review
- Maintainers will review your PR
- Respond to feedback and make requested changes
- Once approved, your PR will be merged
- Celebrate! 🎉

---

## 📋 Guidelines

### Code Quality
- Follow the coding style of existing code
- Keep functions focused and single-purpose
- Write clear variable names
- Add comments for non-obvious logic
- Minimize external dependencies

### Testing
- Test new strategies with WFA + Montecarlo
- Include parameter validation
- Test edge cases
- Document test methodology
- Report all metrics (Sharpe, DD, Win Rate, etc.)

### Documentation
- Update README if adding features
- Document new strategies thoroughly
- Include examples
- Explain parameters and settings
- Add troubleshooting if relevant

### Commit Messages
Format: `[TYPE] Brief description`

Types:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `refactor:` Code restructuring (no behavior change)
- `test:` Tests
- `perf:` Performance improvement

Example:
```
feat: add Z2+ GBP/JPY strategy variant

- Adapt parameters for cross-pair trading
- Include WFA validation results
- Document performance vs EUR/USD
- Add comparison analysis
```

---

## 🚀 Strategy Contribution Guide

### Creating a New Strategy
1. **Research & Development**
   - Study market behavior
   - Develop hypothesis
   - Code implementation
   - Parameter tuning

2. **Backtesting**
   - Test on 5+ years historical data
   - Document period tested
   - Report key metrics

3. **Validation**
   - Walk Forward Analysis (15+ cycles)
   - Montecarlo simulation (200+ runs)
   - Out-of-sample verification

4. **Documentation**
   - Technical analysis (how it works)
   - Parameter explanation
   - Performance breakdown by year
   - Risk assessment
   - Replication guide

5. **Submission**
   - Follow PR process above
   - Include all analysis
   - Reference validation results
   - Explain market regime (trending, ranging, etc.)

### Template for Strategy
```
strategies/NEW_STRATEGY_NAME/
├── ANALYSIS.md              (Technical deep-dive)
├── BACKTEST_RESULTS.md      (Performance metrics)
├── parameters.csv           (Parameter reference)
├── REPLICATION_GUIDE.md     (How to run it)
└── NEW_STRATEGY_NAME.c      (Source code)
```

---

## 🤝 Community Guidelines

### Be Respectful
- Treat everyone with respect
- Welcome diverse perspectives
- No harassment, discrimination, or abuse
- Disagree professionally

### Be Helpful
- Answer questions constructively
- Share knowledge generously
- Help newer contributors
- Provide detailed feedback

### Be Collaborative
- Work together toward common goals
- Give credit where due
- Build on each other's work
- Share successes

### Report Issues Properly
- Be specific and detailed
- Provide reproducible examples
- Don't spam or cross-post
- Follow up on opened issues

---

## 📈 Recognition

Contributors are recognized:
- In the commit history
- In the CONTRIBUTORS file (to be created)
- In major release notes
- On the project homepage

---

## ❓ Questions?

- **Issues**: Use GitHub Issues for bugs/features
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check [ROADMAP.md](ROADMAP.md) for project direction
- **Contact**: Reach out via issue discussion

---

## 📝 License

By contributing, you agree that your contributions will be licensed under the same MIT License.

---

## 🎊 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort!

---

**Happy Contributing! 🚀**
