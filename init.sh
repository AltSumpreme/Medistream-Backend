#!/bin/bash
pnpm dlx prisma generate
pnpm run build
pnpm run start