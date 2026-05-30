import asyncio
from datetime import datetime, timedelta, UTC

from app.database import SessionLocal
from app.models import Item

async def seed():
    async with SessionLocal() as session:
        now = datetime.now(UTC)
        session.add_all([
            Item(sku="SKU-001", status="disponible", warehouse_id=1, created_at=now-timedelta(days=1)),
            Item(sku="SKU-002", status="disponible", warehouse_id=2, created_at=now-timedelta(days=3)),
            Item(sku="SKU-003", status="agotado", warehouse_id=1, created_at=now-timedelta(days=4)),
            Item(sku="SKU-004", status="retrasado", warehouse_id=3, created_at=now-timedelta(days=7)),
            Item(sku="SKU-005", status="agotado", warehouse_id=3, created_at=now-timedelta(days=9)),
        ])
        await session.commit()

if __name__ == "__main__":
    asyncio.run(seed())