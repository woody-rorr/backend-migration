# backend-migration

`backend-lol-api-v3` (Serverless framework Lambda)에서 마이그레이션된 Express API 서버. ECS Fargate에서 ALB로 노출됩니다.

## AWS 배포 환경 (고정)

| 항목 | 값 |
|---|---|
| AWS Profile | `rorr-dev` |
| AWS Account | `239460481239` |
| Region | `us-east-1` |

## 리소스 네이밍 (고정)

| 리소스 | 이름 |
|---|---|
| ECR 레포 | `backend-migration-api` |
| ECS Cluster | `mcp-agents-staging-cluster` |
| ECS Service | `backend-migration-api-service` |
| ECS Task Definition | `backend-migration-api-task` |
| ALB | `mcp-agents-staging-alb` (공유) |
| Target Group | `backend-migration-api-tg` |
| ALB 리스너 포트 | `5012` |
| 컨테이너 포트 | `5012` |
| CloudWatch 로그 그룹 | `/ecs/backend-migration-api` |
| Task Execution Role | `backend-migration-api-execution` |
| Task Role | `backend-migration-api-task` |

## 코드 출처

- 이 레포의 `src/routes/*.js`, `src/handlers/*.js`는 `backend-migration-mcp`가 원본 Lambda 핸들러를 변환해 PR로 추가합니다 (GitHub MCP 경유).
- 사람이 직접 수정할 수도 있고, MCP가 다시 변환 PR을 올릴 수도 있음.

## DB

- 기존 DB 그대로 재사용.
- SSM `/backend-migration-api/database-url`에서 `DATABASE_URL` 주입.

## 도메인

- 기존 `rorr.club` 도메인은 건드리지 않음.
- ALB DNS 직접 접근만 사용 (`http://<ALB>:5012/...`).

## 배포

```bash
export AWS_PROFILE=rorr-dev
bash deploy/deploy.sh
```
