# feat(firebase): intégration Firebase (Auth / Firestore / Storage) + UI upload média et enregistrement sessions PAO

## Résumé

Cette PR ajoute :

- L'intégration Firebase (initialisation via des placeholders / variables d'environnement),
- Helpers : Auth (signup/signin/signout), Firestore (techniques, sessions), Storage (upload de médias),
- UI d'upload média (expo-image-picker) et logique d'attachement du média à une technique (Storage → Firestore),
- Sauvegarde automatique des sessions PAO dans la collection `sessions` de Firestore à la fin d'un drill,
- Script `scripts/importMock.js` pour importer les mocks `src/data/sampleTechniques.json` dans Firestore,
- Fallback aux données locales si Firebase n'est pas configuré (imports dynamiques) pour permettre le développement sans clés.

## Fichiers / ajouts notables

- `src/firebase/firebase.ts` (placeholder config / init)
- `src/firebase/auth.ts`, `src/firebase/firestore.ts`, `src/firebase/storage.ts`
- `src/screens/UploadMediaScreen.tsx`
- `src/screens/PaoTimerScreen.tsx` (sauvegarde session)
- `src/screens/LibraryScreen.tsx`, `src/screens/ProfileScreen.tsx` (adaptations pour Firebase)
- `scripts/importMock.js`
- `package.json` : ajout `firebase` et `expo-image-picker`
- `App.tsx` : route `UploadMedia` ajoutée

Branche source : `feature/firebase`
Branche cible : `main`

---

## Checklist (à vérifier avant merge)

- [ ] Variables `FIREBASE_*` configurées en dev / CI (ne pas committer les clés)
- [ ] Règles Firestore / Storage révisées (ne pas laisser le mode test en production)
- [ ] Tests manuels effectués : inscription/login, lecture techniques, upload image/vidéo, session PAO enregistrée
- [ ] Import des données mock (optionnel) : `yarn import:mock` (après config `FIREBASE_*`)
- [ ] Ajouter limites côté client et règles Storage (taille/type) pour éviter abus
- [ ] Ajouter monitoring/alerting pour coûts Storage si upload vidéo important
- [ ] (Optionnel) Remplacer le script d'import client par Firebase Admin pour import serveur sécurisé

---

## Instructions d'exécution / Test (copier-coller)

1) Récupérer la branche

   git fetch origin
   git checkout feature/firebase

2) Installer dépendances

   yarn install

3) Configurer les variables d'environnement (ex. en local)

   export FIREBASE_API_KEY=...
   export FIREBASE_AUTH_DOMAIN=...
   export FIREBASE_PROJECT_ID=...
   export FIREBASE_STORAGE_BUCKET=...
   export FIREBASE_MESSAGING_SENDER_ID=...
   export FIREBASE_APP_ID=...

   (Sur Windows PowerShell utilisez `$env:FIREBASE_API_KEY="..."`)

4) Lancer Expo

   yarn start

5) (Optionnel) Importer les données mock dans Firestore

   yarn import:mock

6) Tester le flux

   - Ouvrir l'app → Library → choisir une technique → Uploader un média
   - Lancer un PAO drill complet → vérifier la collection `sessions` dans Firestore

---

## Commandes pour créer la PR

A) Avec GitHub CLI (gh) — recommandé

1. Créez un fichier `PR_BODY.md` (ce fichier) ou utilisez le flag `--body-file` :

   gh pr create --base main --head feature/firebase --title "feat(firebase): intégration Firebase (Auth / Firestore / Storage) + UI upload média et enregistrement sessions PAO" --body-file ./PR_BODY.md

B) Avec curl (API GitHub) — nécessite un token en env `GITHUB_TOKEN`

1. Exemple (remplacez `$GITHUB_TOKEN` par votre token) :

   curl -X POST \
     -H "Authorization: token $GITHUB_TOKEN" \
     -H "Accept: application/vnd.github+json" \
     https://api.github.com/repos/francisbielak-art/Academie-2B/pulls \
     -d $'{"title":"feat(firebase): intégration Firebase (Auth / Firestore / Storage) + UI upload média et enregistrement sessions PAO","head":"feature/firebase","base":"main","body":"(Collez ici la description complète)"}'

---

## URL de comparaison

https://github.com/francisbielak-art/Academie-2B/compare/main...feature/firebase

---

## Suggestions pour la PR

- Attribuer un relecteur technique pour vérifier règles Firestore/Storage et sécurité.
- Ajouter le label `feature` et `needs review`.
- (Optionnel) Ajouter CI (lint/tests) à exécuter avant merge.

