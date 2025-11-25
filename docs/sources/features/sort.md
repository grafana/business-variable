---
title: Sort by status
description: Learn how to enable sorting of variable panel values based on numeric
  data retrieved from your data source.
keywords:
- business variable
labels:
  products:
  - cloud
  - enterprise
  - oss
weight: 100
---

# Sort by status

You can allow users to sort the Business Variable panel values based on the data retrieved from the data source.

For that set **Sort by Status** option to **Enabled** and specify:

- **Field with variable values**. That field is used to map the data frame with the variable panel values.
- **Field with status values**. It should be a numeric format, the values are used for sorting.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/sorting.png" class="border" alt="Sorting button configuration." >}}

The sorting button alternates between three modes when a user clicks.

- Neutral. The variable panel is in this state after the page loads and after each page refresh.
- Descending.
- Ascending.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/sorting-alt.png" max-width="400px" class="border" alt="Sorting button has three alternating by click modes." >}}
