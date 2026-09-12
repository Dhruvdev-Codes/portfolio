/**
 * Knowledge Topics Database for Dhruv AI
 * General CS, AI, Cloud, Systems, Science & General Knowledge
 */

export const CS_AI_TOPICS: Record<string, string> = {
  transformer: `### **Transformers & The Attention Mechanism:**

The **Transformer** architecture (introduced in *"Attention Is All You Need"*) revolutionized NLP and modern AI by replacing recurrence with **Self-Attention**.

#### **Key Formulation:**
$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$

- **$Q$ (Query):** What the current token is seeking.
- **$K$ (Key):** What each token contains/advertises.
- **$V$ (Value):** The actual informational representation.
- **$\\sqrt{d_k}$:** Scaling factor preventing vanishing gradients during softmax.

**Multi-Head Attention** computes attention across multiple linear projections in parallel, capturing syntactic and semantic dependencies simultaneously.`,

  llm: `### **Large Language Models (LLMs) & Modern AI:**

**Large Language Models (LLMs)** like GPT-4, Gemini, and Claude are deep neural networks trained on vast textual datasets using self-supervised learning:

1. **Pre-training:** Next-token prediction across trillions of tokens using Transformer decoder architectures to acquire world knowledge and language reasoning.
2. **Supervised Fine-Tuning (SFT):** Instruction tuning on high-quality human Q&A demonstrations.
3. **RLHF / DPO (Alignment):** Reinforcement Learning from Human Feedback (using PPO or Direct Preference Optimization) aligning outputs for accuracy, safety, and helpfulness.
4. **Inference & KV Caching:** Autoregressively generates response tokens with high throughput.`,

  rag: `### **Retrieval-Augmented Generation (RAG) & Vector Search:**

**RAG (Retrieval-Augmented Generation)** enhances LLMs by dynamically retrieving relevant facts from an external knowledge base before generating responses:

1. **Chunking & Embeddings:** Documents are partitioned and mapped into high-dimensional vector space using embedding models.
2. **Vector Indexing & Similarity Search:** Stored in vector databases (Upstash, Pinecone, Milvus) using Cosine Similarity:
   $$\\text{Similarity} = \\frac{\\mathbf{A} \\cdot \\mathbf{B}}{\\|\\mathbf{A}\\| \\|\\mathbf{B}\\|}$$
3. **Prompt Augmentation:** Retrieved chunks are injected into the system context, grounding the LLM in verified facts and eliminating hallucinations.`,

  binary_search: `### **Binary Search Algorithm:**

Binary Search locates a target value in a **sorted array** in $\\mathcal{O}(\\log n)$ logarithmic time.

\`\`\`python
def binary_search(arr: list[int], target: int) -> int:
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2  # Prevents integer overflow
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1  # Target not found

# Example:
numbers = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print(binary_search(numbers, 23))  # Returns index 5
\`\`\`

#### **Complexity:**
- **Time Complexity:** $\\mathcal{O}(\\log n)$
- **Space Complexity:** $\\mathcal{O}(1)$ iterative`,
  sorting: `### **QuickSort vs. MergeSort:**

| Metric | **QuickSort** | **MergeSort** |
| :--- | :--- | :--- |
| **Best / Avg Time** | $\\mathcal{O}(n \\log n)$ | $\\mathcal{O}(n \\log n)$ |
| **Worst Time** | $\\mathcal{O}(n^2)$ (rare with good pivot) | $\\mathcal{O}(n \\log n)$ |
| **Space Complexity** | $\\mathcal{O}(\\log n)$ (in-place) | $\\mathcal{O}(n)$ (auxiliary buffer) |
| **Stability** | Not stable | Stable |

\`\`\`python
# MergeSort Implementation
def merge_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    merged = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i]); i += 1
        else:
            merged.append(right[j]); j += 1
    merged.extend(left[i:]); merged.extend(right[j:])
    return merged
\`\`\``,

  big_o: `### **Big-O Asymptotic Complexity:**

Big-O describes how algorithm time/space scales with input size $n$:

- $\\mathcal{O}(1)$ — **Constant Time:** Hash map lookup, array indexing.
- $\\mathcal{O}(\\log n)$ — **Logarithmic Time:** Binary Search, balanced BST operations.
- $\\mathcal{O}(n)$ — **Linear Time:** Single loop scan, linear search.
- $\\mathcal{O}(n \\log n)$ — **Linearithmic Time:** MergeSort, QuickSort (avg), HeapSort.
- $\\mathcal{O}(n^2)$ — **Quadratic Time:** Nested loops, BubbleSort, InsertionSort.
- $\\mathcal{O}(2^n)$ — **Exponential Time:** Brute-force subset generation, naive Fibonacci recursion.`,

  docker_k8s: `### **Docker & Kubernetes Containerization:**

- **Docker:** Packages code, runtime, system tools, and libraries into immutable container images using Linux cgroups and namespaces for process isolation.
- **Kubernetes (K8s):** Container orchestration platform managing:
  - **Pods:** Smallest deployable unit (co-located containers).
  - **Deployments:** Manages replica sets, declarative updates, and self-healing.
  - **Services & Ingress:** Exposes Pods via stable cluster IPs, DNS, and layer-7 routing.`,

  apis: `### **API Protocols & Distributed Communication:**

• **REST:** Stateless HTTP endpoints operating on resource URLs (GET, POST, PUT, DELETE).
• **GraphQL:** Single endpoint where clients query the exact schema fields needed, preventing over/under-fetching.
• **gRPC:** High-throughput RPC over HTTP/2 using binary Protocol Buffers (Protobuf) serialization.
• **WebSockets:** Persistent, full-duplex TCP connections for real-time bidirectional messaging.`,

  databases: `### **Databases & The CAP Theorem:**

#### **1. SQL vs. NoSQL:**
- **Relational (MySQL/Postgres):** Structured tables, ACID transactions, 3NF schema normalization, complex SQL joins.
- **Document (MongoDB):** Flexible BSON JSON-like documents, horizontal sharding, dynamic schema.
- **In-Memory (Redis):** Sub-millisecond key-value caching, Pub/Sub, and fast session management.

#### **2. CAP Theorem:**
A distributed system can satisfy at most two of three guarantees:
- **Consistency ($C$):** All nodes see the same data at the same time.
- **Availability ($A$):** Every non-failing node returns a response.
- **Partition Tolerance ($P$):** System continues operating despite network packet drops.`,

  quantum: `### **Quantum Computing Fundamentals:**

Quantum computing uses quantum mechanical principles for exponential computational speedups:

1. **Qubits & Superposition:**
   - Unlike classical bits ($0$ or $1$), a qubit exists in a superposition:
     $$|\\psi\\rangle = \\alpha |0\\rangle + \\beta |1\\rangle, \\quad \\text{with } |\\alpha|^2 + |\\beta|^2 = 1$$
2. **Entanglement:** Correlation where observing one qubit instantly determines the state of its entangled pair.
3. **Algorithms:** Shor's algorithm for prime factorization in polynomial time; Grover's algorithm for quadratic unstructured search speedup $\\mathcal{O}(\\sqrt{N})$.`,

  photosynthesis: `### **Photosynthesis & Energy Conversion:**

Photosynthesis converts light energy into chemical energy stored in glucose:

$$6\\text{CO}_2 + 6\\text{H}_2\\text{O} + \\text{light} \\longrightarrow \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2$$

- **Light Reactions (Thylakoid Membrane):** Chlorophyll absorbs photons, splitting water into protons, electrons, and $\\text{O}_2$, yielding **ATP** and **NADPH**.
- **Calvin Cycle (Stroma):** Carbon fixation synthesizing glucose using ATP and NADPH.`,

  flight: `### **Principles of Flight & Aerodynamics:**

Aircraft generate flight through four balanced forces: **Lift**, **Weight**, **Thrust**, and **Drag**.

- **Lift Generation:** Airfoils curve oncoming air downward. By **Bernoulli's Principle** (pressure differential) and **Newton's Third Law** (downward air deflection), an equal upward reaction force (Lift) is created.`,
};

export const WORLD_CAPITALS: Record<string, string> = {
  france: "Paris",
  japan: "Tokyo",
  india: "New Delhi",
  usa: "Washington, D.C.",
  "united states": "Washington, D.C.",
  germany: "Berlin",
  uk: "London",
  "united kingdom": "London",
  canada: "Ottawa",
  australia: "Canberra",
  italy: "Rome",
  spain: "Madrid",
  russia: "Moscow",
  china: "Beijing",
  brazil: "Brasília",
};

