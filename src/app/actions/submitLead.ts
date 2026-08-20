"use server";

export async function submitLead(data: any, eventId: string) {
  try {
    // 1. Calculate Score
    let score = "Cold";
    const revenueMap: Record<string, number> = {
      "Até R$ 20 mil": 10,
      "R$ 20 mil a R$ 40 mil": 30,
      "R$ 40 mil a R$ 70 mil": 50,
      "R$ 70 mil a R$ 120 mil": 90,
      "R$ 120 mil a R$ 200 mil": 150,
      "Mais de R$ 200 mil": 250,
    };
    
    const revenueVal = revenueMap[data.faturamento] || 0;
    
    if (
      revenueVal >= 40 &&
      data.orcamento !== "Até R$ 1.500" &&
      data.orcamento !== "Ainda não tenho orçamento definido" &&
      data.decisao === "Sim" &&
      data.midia === "Sim"
    ) {
      score = "Hot";
    } else if (revenueVal >= 20) {
      score = "Warm";
    }

    const payload = {
      ...data,
      score,
      eventId,
      submittedAt: new Date().toISOString(),
    };

    // 2. Send to generic CRM Webhook (Mock)
    console.log("=== NEW LEAD SUBMITTED ===");
    console.log(JSON.stringify(payload, null, 2));
    console.log("==========================");

    // 3. (Optional) Send to Meta Conversions API via Node Fetch
    // If we had the access token:
    /*
    const CAPI_TOKEN = process.env.META_CAPI_TOKEN;
    const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    if (CAPI_TOKEN && PIXEL_ID) {
      const eventName = score === "Hot" ? "QualifiedLead" : "Lead";
      // Send fetch to graph.facebook.com/v19.0/${PIXEL_ID}/events
    }
    */

    return { success: true, score };
  } catch (error) {
    console.error("Failed to submit lead:", error);
    return { success: false, error: "Internal Server Error" };
  }
}
