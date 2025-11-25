---
title: Empty value in Multi-value
description: Learn how to allow users to unselect all values in multi-value variables
  using the Allow empty value option.
keywords:
- business variable
labels:
  products:
  - cloud
  - enterprise
  - oss
weight: 300
---

# Empty value in Multi-value

{{< admonition type="note" >}}
The empty value option was introduced in version 2.0.0.
{{< /admonition >}}

This feature works for the **Minimize** and **Button** display modes.

Before this feature was introduced there was no way to unselect all values. A user always had to have something selected after they made the first selection.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/multi-value.png" class="border" alt="Multi-value setting for dashboard variables." >}}

For this feature to work, you must enable the **Allow empty value** parameter in the **Values** category.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/empty-all.png" class="border" alt="When Allow empty value is enabled, a user can unselect all variable values." >}}
