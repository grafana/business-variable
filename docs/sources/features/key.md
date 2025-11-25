---
title: Key-values format in variables
description: Learn how to use key-value pairs in variables to join data sets by IDs
  while displaying user-friendly names.
keywords:
- business variable
labels:
  products:
  - cloud
  - enterprise
  - oss
weight: 200
---

# Key-values format in variables

A Grafana variable can contain key-value pairs. This makes it possible to join data sets by IDs (key) while displaying user-friendly names (value). The Business Variable panel supports this feature in all modes.

In the following example, screen 1 shows the `city` variable created with three key-value pairs.

```text
Chicago:1, New York:2, Tampa:3
```

Screen 2 shows a dashboard view where end users see only city names. After you make a selection (here, New York:2), the variable value becomes 2.

You can then use the `city` variable's value in queries for other panels, as shown in screen 3.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/key-value.png" class="border" alt="Example of the key-value variable format in the Business Variable panel." >}}
