---
title: Slider
description: Learn how to use the Slider display mode for single-value selection from
  long lists of numeric or text values.
keywords:
- business variable
labels:
  products:
  - cloud
  - enterprise
  - oss
weight: 400
---

# Slider

{{< admonition type="note" >}}
The Business Variable panel supports the **Slider** display mode starting from version 3.0.0.
{{< /admonition >}}

**Slider** is the fourth **Display mode** option.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/slider-mode.png" max-width="400px" class="border" alt="You can set the Slider Display mode in the Business Variable category." >}}

Use the **Slider** display mode when a dashboard variable contains many values and only one selection is logically acceptable. For example, a user might need to choose a year, as shown in the following video. A standard drop-down list appears for comparison.

{{< video-embed src="/media/docs/grafana/panels-visualizations/business-variable/slider.mp4" >}}

{{< admonition type="note" >}}
The **Slider** display mode works only for the Single-value dashboard variables.
{{< /admonition >}}

You can also display text values using the **Slider** display mode.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/slider-string.png" max-width="400px" class="border" alt="Text values are allowed in the Slider display mode." >}}
