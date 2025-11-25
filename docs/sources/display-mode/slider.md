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

The **Slider** is a fourth **Display mode** option.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/slider-mode.png" class="border" alt="You can set the Slider Display mode in the Business Variable category." >}}

When a dashboard variable contains a massive volume of values and only one selected value is logically acceptable, the **Slider** display mode is your way to go. For instance, a user needs to choose a year as shown below. A standard alternative (long dropdown list) is shown for comparison.

{{< video-embed src="/media/docs/grafana/panels-visualizations/business-variable/slider.mp4" >}}

{{< admonition type="note" >}}
The **Slider** display mode works only for the Single-value dashboard variables.
{{< /admonition >}}

Text values also could be displayed using the **Slide** display mode.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/slider-string.png" class="border" alt="Text values are allowed in the Slider display mode." >}}
