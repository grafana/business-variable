---
title: Persistent mode
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

# Persistent mode

{{< admonition type="note" >}}
Variable panel supports redirects since version 2.3.1.
{{< /admonition >}}

This feature applies when you configure the Business Variable panel in the **Minimize** and **Button** layouts. You can turn this mode on or off in the Business Variable panel options.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/persist-on-off.png" max-width="400px" class="border" alt="Enable/Disable the Persistent mode." >}}

When you enable persistent mode, selected values are stored in the browser's local storage. This is useful when one Business Variable panel controls another Business Variable panel.

For example, in the following illustration, two variable panels exist. One displays countries and the other displays states within the selected country. The user chose **USA** in the first panel and then **IL** in the second panel.

Depending on the **Persistent** option value set for the **State** variable panel, the selected value is either saved in the browser for future use or not.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/persistent.png" class="border" alt="Persistent option allows to keep the selected values in the browser's local cache." >}}
