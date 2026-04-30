# GENESIS — UI Polish QA Checklist

## Goal

Verify that the browser demo feels more premium, psychologically effective, and product-grade.

## Visual Checks

1. Top slogan says:
   Stop risky AI code before it runs.

2. Supporting copy is clear.

3. UI no longer feels like a traffic light.

4. Scenario controls feel premium and controlled.

5. Main CTA says:
   Run Safety Check

6. Warning card is visible and clean.

7. Commercial boundary note is visible:
   First simulated fix is free.
   Additional fixes require a paid pilot or setup.

8. Footer shows only:
   Public demo

9. Result panel feels authoritative and clear.

10. Overall page feels more premium, calm, and psychologically persuasive.

## Functional Checks

### Safe scenario
Expected:
- ALLOW
- LOW

### Dangerous export nullification
Expected:
- BLOCK
- CRITICAL

### Dead-code gate
Expected:
- REQUIRE_APPROVAL
- ELEVATED

### Custom danger
Input:
module.exports = null;
Expected:
- BLOCK

### Custom safe input
Input:
function add(a, b) {
  return a + b;
}
Expected:
- ALLOW

## Safety Check

The page must not contain:
- lib/genesis
- internalRiskEngine
- semanticRiskEngine
- decisionEngine
- filesystemExecutionAdapter
- 01_Active_Projects
- 00_AI_System
- OPENAI_API_KEY
- ANTHROPIC_API_KEY
- process.env
- yaron180986-create/genesis.git
- genesis-core-private

## Approval

Only share the updated browser demo after visual quality and functional behavior both pass.
