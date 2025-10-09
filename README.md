# DOSALA CheckList — Dual Save (Auto + Manual)

- Corrige la sobre-escritura de ítems al agregar nuevos.
- Doble guardado: auto (Firestore + localStorage) y manual (botón “Guardar ahora”).
- En login, carga la versión más reciente (nube vs local) usando `lastUpdated`.

## Despliegue en GitHub Pages
1) Sube a la **raíz** del repo: `index.html`, `manifest.json`, `service-worker.js`, carpeta `icons/`.
2) Settings → Pages → main / root.
3) Abre tu sitio y recarga con Ctrl+F5.

## Firebase
- Proyecto: `dosalachecklist`
- Auth Email/Password habilitado y usuarios creados (Diego / Chabeli).
- Authorized domains: `localhost`, `diego01df.github.io`.
- Reglas mínimas Firestore:
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
