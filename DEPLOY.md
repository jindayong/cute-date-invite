# 데이트 초대장 배포하기

## 로컬에서 확인

```bash
npm install
npm run build
npm run preview
```

빌드 결과물은 `dist` 폴더에 생성됩니다.

## Vercel

1. GitHub에 이 프로젝트를 올립니다.
2. Vercel에서 새 프로젝트로 import합니다.
3. 설정은 `vercel.json`이 자동으로 적용됩니다.
   - Build Command: `npm run build`
   - Output Directory: `dist`

## Netlify

1. GitHub에 이 프로젝트를 올립니다.
2. Netlify에서 새 사이트로 import합니다.
3. 설정은 `netlify.toml`이 자동으로 적용됩니다.
   - Build command: `npm run build`
   - Publish directory: `dist`

## 정적 호스팅

`npm run build` 후 생성된 `dist` 폴더 안의 파일을 호스팅 서비스에 업로드하면 됩니다.
