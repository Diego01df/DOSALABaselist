# DOSALA CheckList (Sync + PWA)

App de checklist con **autosave** en Firestore, **offline** (PWA) y sincronización entre dispositivos para dos usuarios (Diego y Chabeli).

## ✅ Qué incluye
- Login (selector Diego / Chabeli) con Email/Password de Firebase.
- Guardado **automático** de cada cambio en **Firestore** y copia local en `localStorage`.
- Recupera automáticamente el último estado al iniciar sesión desde cualquier dispositivo.
- **PWA**: instalable y usable **offline** (Service Worker + caché).
- Preparado para **GitHub Pages**: `https://diego01df.github.io/DOSALABaselist/`

## 🚀 Cómo subirlo a GitHub Pages
1. Entra al repo **DOSALABaselist** → **Add file → Upload files**.
2. Sube estos archivos a la **raíz** del repo:
   - `index.html`
   - `manifest.json`
   - `service-worker.js`
   - carpeta `icons/` (con `icon-192.png` y `icon-512.png`)
   - `README.md`
3. Ve a **Settings → Pages** y verifica:
   - Source: **Deploy from a branch**
   - Branch: **main** / Folder: **/(root)**
4. Visita: https://diego01df.github.io/DOSALABaselist/  
5. Presiona **Ctrl+F5** (recarga dura) para limpiar caché del SW.

## 🛠️ Firebase necesario
- Proyecto: **dosalachecklist**
- Authentication → **Email/Password**: **Enable**.
- Authentication → **Users**: crea
  - `yosoyelpintor@gmail.com`
  - `ch.hernandezflores@gmail.com`
- Authentication → **Authorized domains**: agrega `localhost` y `diego01df.github.io`.
- Firestore Database → **Create database** (modo **Production**).  
- Reglas mínimas:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

## 🧪 Cómo probar que sincroniza
1. Inicia sesión con Diego o Chabeli.
2. Agrega o completa algunos ítems y espera 2–3 s.
3. Abre **Firestore Database → users/**: verás un documento (UID) con los campos `items`, `archived`, `trash`, `history`, `elapsedText`, `lastUpdated`.
4. En otro dispositivo/navegador, entra con el mismo usuario y verás los mismos datos.

## ❗Notas
- El **Service Worker** puede cachear versiones antiguas. Si actualizas archivos, usa **Ctrl+F5** o en **Application → Service Workers → Unregister**.
- Si ves `auth/unauthorized-domain`, agrega tu dominio de Pages en **Authorized domains**.
- Si ves `auth/operation-not-allowed`, habilita Email/Password en **Sign-in method**.
