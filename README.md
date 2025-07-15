# 🔥 Firewatch
## Civil Rights Protection & Documentation App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PWA](https://img.shields.io/badge/PWA-enabled-brightgreen.svg)](https://web.dev/progressive-web-apps/)
[![Privacy First](https://img.shields.io/badge/Privacy-First-blue.svg)](#privacy--security)

**Firewatch** is a comprehensive civil rights protection application designed to help individuals document encounters, know their rights, and stay informed about local enforcement activities. Built with privacy-first principles, everything runs locally on your device.

🌐 **Live App**: [https://firewatch-ice.vercel.app](https://firewatch-ice.vercel.app)

---

## 🚨 **What This App Does**

### Core Features
- 📱 **Emergency Response Tools**: One-tap panic button with automated alerts
- 📚 **Know Your Rights Education**: Constitutional protections in multiple languages
- 🎥 **Secure Evidence Recording**: Document violations with legal-grade metadata
- 🗺️ **Community Safety Map**: Real-time community reports and safety information
- 🔍 **Live Area Scanner**: AI-powered local threat intelligence (optional)
- 📞 **Legal Resources**: Instant access to hotlines and legal contacts
- 🎯 **Scenario Simulators**: Practice responding to real-life encounters

### Interactive Training Modules
- **Traffic Stop Simulation**: Learn proper procedures during police stops
- **Workplace Raid Response**: Know your rights during ICE enforcement
- **Home Visit Encounters**: Protect your Fourth Amendment rights
- **Know Your Rights Quiz**: Test your constitutional knowledge

---

## 🛡️ **Privacy & Security**

### Your Data Stays Private
- ✅ **No backend servers** - Everything runs locally in your browser
- ✅ **No user accounts** or registration required
- ✅ **No tracking or analytics** - Your usage is completely private
- ✅ **API keys stored locally** - Never transmitted to our servers
- ✅ **Open source code** - Fully auditable by security experts
- ✅ **Works offline** - Critical features available without internet

### Technical Privacy Details
Your Gemini API key is stored exclusively in your browser's local storage and only transmitted directly to Google's API when you use AI features. **We never see your API key, location data, or any personal information.**

**Being open source means you can verify these claims yourself** - check our code or have a security expert audit it.

---

## 🚀 **Getting Started**

### For Everyone (Non-Technical Users)

1. **Visit the App**: Go to [https://firewatch-ice.vercel.app](https://firewatch-ice.vercel.app)

2. **Install as App** (Recommended):
   - **Chrome/Edge**: Look for "Install" button in address bar
   - **Safari**: Share → "Add to Home Screen"
   - **Firefox**: Menu → "Install"

3. **Basic Setup**:
   - Works immediately for rights education and emergency features
   - For AI features (optional): Get free API key from [Google AI Studio](https://aistudio.google.com/)
   - Add key in Settings → Save
   - **Your key stays on your device forever**

4. **Core Features Work Offline**: Rights guides, emergency contacts, and recording tools

### For Developers

```bash
# Clone the repository
git clone https://github.com/severian42/Firewatch.git
cd Firewatch

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

**Tech Stack**: React, TypeScript, Vite, TailwindCSS, PWA

---

## 🔧 **API Configuration**

### Why an API Key?
AI features (area scanning, legal jargon explanations) require a free Gemini API key. **This is completely optional** - all core, non-AI features work without it.

### Getting Your Free API Key
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Sign in with Google account
3. Create new API key
4. Copy key to Firewatch Settings
5. Click "Save Settings"

### What the API Does
- **Local area threat scanning**: Searches public information for enforcement activity
- **Legal jargon explanations**: Clarifies complex legal terms
- **State law lookups**: Checks recording consent laws by state

**Important**: The API never receives your location, personal data, or app usage patterns. It only gets the specific queries you choose to make.

---

## 📖 **User Guide**

### Emergency Features
- **Panic Button**: Activates emergency broadcast and recording
- **Emergency Contacts**: Pre-configured family/legal notifications
- **Legal Hotlines**: One-tap access to ACLU, bail funds, etc.

### Documentation Tools
- **Video/Audio/Photo Recording**: With legal metadata
- **Evidence Management**: Organize and annotate recordings
- **Chain of Custody**: Timestamps and location data for legal use

### Educational Content
- **Constitutional Rights**: 1st, 4th, 5th Amendment protections
- **Traffic Stop Guide**: Step-by-step procedures
- **ICE Encounter Rights**: Know your protections regardless of status
- **Recording Laws**: State-by-state recording consent requirements

---

## 🛠️ **Technical Details**

### Architecture
- **Frontend**: React 18 + TypeScript + Vite
- **UI**: TailwindCSS with custom design system
- **PWA**: Service Worker + Web App Manifest
- **Storage**: Browser Local Storage (encrypted)
- **AI**: Google Gemini API (optional, user-provided key)

### Privacy Implementation
```typescript
// Example: All data stays local
const saveEvidence = (evidence: Evidence) => {
  // Stored only in browser local storage
  localStorage.setItem('evidence', JSON.stringify(evidence));
  // Never transmitted to external servers
};
```

### Offline Capabilities
- ✅ Rights education content
- ✅ Emergency contact access
- ✅ Recording functionality
- ✅ Evidence storage and management
- ❌ Live area scanning (requires internet)
- ❌ AI-powered features (requires internet)

---

## 🤝 **Contributing**

We welcome contributions! This project exists to help protect civil rights.

### Ways to Help
- **Translation**: Help translate content into more languages
- **Legal Review**: Verify rights information for accuracy
- **Code Contributions**: Bug fixes, features, security improvements
- **Documentation**: Improve guides and explanations
- **Testing**: Report bugs and usability issues

### Development Setup
```bash
git clone https://github.com/severian42/Firewatch.git
cd Firewatch
npm install
npm run dev
```

### Contribution Guidelines
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📞 **Support & Feedback**

### Reporting Issues
- **GitHub Issues**: [Report bugs or request features](https://github.com/severian42/Firewatch/issues)
- **Security Issues**: Email security concerns privately

### Common Questions

**Q: Is this app legal?**
A: Yes. Everything Firewatch does is protected under the First Amendment (education, documentation) and established constitutional rights.

**Q: Do I need the API key?**
A: No. Core features (rights education, emergency tools, recording) work without any API key.

**Q: Can this be traced back to me?**
A: No. The app has no servers, no accounts, and no tracking. Your usage is completely private.

**Q: What data does Google see?**
A: Only the specific AI queries you choose to make (like "explain probable cause"). Never your location, identity, or app usage.

**Q: Does this work offline?**
A: Most features work offline. Only AI-powered features require internet.

---

## ⚖️ **Legal Information**

### Disclaimer
This app provides educational information about constitutional rights. **It is not a substitute for professional legal advice.** Always consult with a qualified attorney for specific legal matters.

### Your Rights
- **1st Amendment**: Right to record police in public
- **4th Amendment**: Protection from unreasonable searches
- **5th Amendment**: Right to remain silent
- **14th Amendment**: Equal protection regardless of status

### Recording Laws
Laws vary by state. Use the built-in State Law Scanner to check your local recording consent requirements.

---

## 🌟 **The Story Behind Firewatch**

Built in response to increasing civil rights violations across the United States. Named after fire lookout towers - early warning systems that protect communities from danger.

**Mission**: Ensure everyone has access to constitutional protections and the tools to document violations, regardless of documentation status, language, or technical knowledge.

**Why Free**: Civil rights protection shouldn't be a privilege. This app will always be free, open-source, and privacy-first.

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**What this means**: You can use, modify, and distribute this software freely, even for commercial purposes, as long as you include the original license.

---

## 🙏 **Acknowledgments**

- **ACLU**: Legal guidance and rights information
- **National Lawyers Guild**: Know Your Rights materials
- **EFF**: Digital rights and privacy best practices
- **Community Contributors**: Translations, testing, and feedback
- **[Interwoven Arkitech](https://www.interwoven-arkitech.com/)**: AI-powered development and architectural guidance

---

## 🔗 **Links**

- **Live App**: [https://firewatch-ice.vercel.app](https://firewatch-ice.vercel.app)
- **Source Code**: [https://github.com/severian42/Firewatch](https://github.com/severian42/Firewatch)
- **Google AI Studio**: [https://aistudio.google.com](https://aistudio.google.com)
- **Progressive Web Apps Guide**: [https://web.dev/progressive-web-apps/](https://web.dev/progressive-web-apps/)

---

**Remember**: Knowledge of your rights is the first line of defense against their violation. Stay informed, stay safe, and help others do the same.

*"The price of freedom is eternal vigilance."*
