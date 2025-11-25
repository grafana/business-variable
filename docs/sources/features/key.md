---
title: Key-values format in Variables
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

# Key-values format in Variables

A Grafana variable can be composed of a key and value to make it possible to join data sets by IDs(key) while displaying user-friendly names(value). The Business Variable panel supports this feature in all modes.

In the illustration below, screen 1, the `city` variable is created with three key-value pairs.

```text
Chicago:1, New York:2, Tampa:3
```

Screen 2 is a dashboard view where an end-user sees only city names. After the selection is made (here, New York:2), the variable carries a value equal to 2.

From there the `city` variable's value can be used in the queries for other panels, screen 3.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/key-value.png" class="border" alt="Example of the key-value variable format in the Business Variable panel." >}}
