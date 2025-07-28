// ==UserScript==
// @name         Firebase AppCheck Extension for TurboWarp
// @description  Génère un token App Check
// @version      1.0
// ==/UserScript==

class FirebaseAppCheckExtension {
  constructor(runtime) {
    this.runtime = runtime;
    this.firebaseApp = null;
    this.appCheck = null;
  }

  getInfo() {
    return {
      id: 'firebaseAppCheck',
      name: 'Firebase AppCheck',
      blocks: [
        {
          opcode: 'init',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Initialiser Firebase avec API [API_KEY] et Project ID [PROJECT_ID]',
          arguments: {
            API_KEY: { type: Scratch.ArgumentType.STRING, defaultValue: '...' },
            PROJECT_ID: { type: Scratch.ArgumentType.STRING, defaultValue: '...' },
          },
        },
        {
          opcode: 'getToken',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Obtenir token AppCheck',
        },
      ],
    };
  }

  async init(args) {
    if (this.firebaseApp) return;

    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js');
    const { initializeAppCheck, ReCaptchaV3Provider, DebugProvider } = await import('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-check.js');

    const config = {
      apiKey: args.API_KEY,
      projectId: args.PROJECT_ID,
    };
    this.firebaseApp = initializeApp(config);

    // ✅ Debug : pour test local
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;

    this.appCheck = initializeAppCheck(this.firebaseApp, {
      provider: new DebugProvider(), // ✅ Debug pour Scratch, pas besoin de domaine autorisé
      isTokenAutoRefreshEnabled: true,
    });

    console.log('Firebase et AppCheck initialisés');
  }

  async getToken() {
    if (!this.appCheck) {
      console.error('AppCheck non initialisé.');
      return '';
    }
    const tokenResult = await this.appCheck.getToken();
    return tokenResult.token;
  }
}

Scratch.extensions.register(new FirebaseAppCheckExtension());
