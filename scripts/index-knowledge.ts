import { Index } from "@upstash/vector";
import knowledgeData from "../data/knowledge.json";

const url = process.env.UPSTASH_VECTOR_REST_URL;
const token = process.env.UPSTASH_VECTOR_REST_TOKEN;

if (!url || !token) {
  console.log("UPSTASH_VECTOR_REST_URL and UPSTASH_VECTOR_REST_TOKEN must be set to index data.");
  console.log("Skipping vector database ingestion (fallback local RAG will be used).");
  process.exit(0);
}

const index = new Index({
  url,
  token,
});

async function populateVectorDB() {
  console.log("Upserting knowledge vectors for Dhruv Upadhyay portfolio...");
  try {
    for (const doc of knowledgeData) {
      await index.upsert({
        id: doc.id,
        data: `${doc.title}\n${doc.content}`,
        metadata: { category: doc.category, title: doc.title },
      });
      console.log(`✓ Indexed: ${doc.title}`);
    }
    console.log("Vector DB ingestion completed successfully.");
  } catch (error) {
    console.error("Vector DB ingestion failed:", error);
    process.exit(1);
  }
}

populateVectorDB();
