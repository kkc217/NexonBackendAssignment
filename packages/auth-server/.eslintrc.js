module.exports = {
  // TypeScript를 파싱하기 위한 파서 설정
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': 2, // Prettier 규칙을 강제로 적용합니다 (2: error level).
    'no-multiple-empty-lines': 2, // 여러 개의 연속된 빈 줄을 금지합니다 (2: error level).
    'no-duplicate-imports': 2, // 중복된 import를 금지합니다 (2: error level).
    'no-mixed-spaces-and-tabs': 2, // 탭과 스페이스 혼용을 금지합니다 (2: error level).

    'no-else-return': ['error', { allowElseIf: true }], // else return 문에서 else if를 허용합니다.
    'no-param-reassign': 1, // 함수 매개변수 재할당에 대해 경고를 발생시킵니다 (1: warning level).
    'no-var': 2, // var 사용을 금지합니다 (2: error level).
    '@typescript-eslint/no-explicit-any': 1, // 기존 사내 컨밴션 : any 타입 사용을 경고로 설정합니다 (1: warning level).
    '@typescript-eslint/no-var-requires': 1, // require() 사용에 대해 경고를 발생시킵니다 (1: warning level).
    '@typescript-eslint/no-unused-vars': 1, // 사용되지 않는 변수에 대해 경고를 발생시킵니다 (1: warning level).
    'no-unused-vars': 0,
    'no-useless-escape': 0,
    'no-undef': 0,
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true, // 대소문자를 구분하지 않고 알파벳 순으로 정렬합니다.
          order: 'asc', // 알파벳 순서로 정렬합니다.
        },
        groups: [
          'external', // 외부 모듈
          'builtin', // 내장 모듈
          'internal', // 내부 모듈
          'sibling', // 같은 폴더 내 파일
          'parent', // 부모 폴더 내 파일
          'index', // 인덱스 파일
        ],
        'newlines-between': 'always', // 그룹 사이에 항상 새로운 줄을 추가합니다.
      },
    ],
  },
};
