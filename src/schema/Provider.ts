 model Provider {
  id        String          @id
  order     Order?          @relation(fields: [order_id], references: [id])
  order_id      String   @unique 
  locations ProviderLocation[]
}
