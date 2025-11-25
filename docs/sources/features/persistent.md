---
title: Persistent Mode
description: Learn how to use Persistent Mode to store selected variable values in
  browser local storage across dashboard sessions.
keywords:
- business variable
labels:
  products:
  - cloud
  - enterprise
  - oss
weight: 400
---

# Persistent Mode

{{< admonition type="note" >}}
Variable panel supports redirects since version 2.3.1.
{{< /admonition >}}

This feature is applicable when the Business Variable panel is configured in the **Minimize** and **Button** layouts. This mode could be turned on and off in the Business Variable panel options.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/persist-on-off.png" class="border" alt="Enable/Disable the Persistent mode." >}}

When **Enabled**, the selected values are stored in the browser's local storage. It comes in handy when one Business Variable panel is controlled by the other Business Variable panel.

For instance, in the illustration below, I have two variable panels. One displays countries and the other one displays states within the selected country. I chose **USA** in the first panel and then **IL** on the other panel.

Depending on the **Persistent** option value set for the **State** variable panel, the selected value is either _saved_ in the browser for future use or _not_.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/persistent.png" class="border" alt="Persistent option allows to keep the selected values in the browser's local cache." >}}
