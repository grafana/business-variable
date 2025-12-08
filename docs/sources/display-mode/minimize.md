---
title: Minimize
description: Learn how to use the Minimize display mode to create compact dropdown
  selectors for Query and Custom variables with manual entry support.
keywords:
- business variable
labels:
  products:
  - cloud
  - enterprise
  - oss
weight: 200
---

# Minimize

Select **Minimize** to create a native select element that you can place anywhere on your dashboard.

The minimize mode works for Query and Custom variables.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/query-custom.png" class="border" alt="The minimized mode works for Query and Custom variables." >}}

In the minimize mode, the variable panel lets you update dashboard variables without using the top space. You can place the panel anywhere on the dashboard.

In the following example, four Business Variable panels appear in the top right. They provide selection for Regions, Countries, States, and Markets.

{{< video-embed src="/media/docs/grafana/panels-visualizations/business-variable/select.mp4" >}}

## Single or multi-value variables

Based on the variable options, you can select a single or multi-value variable.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/multi.png" class="border" alt="Single and multi-value variables in the minimized mode." >}}

When needed, the minimize mode expands to a multi-line element.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/minimize.png" class="border" alt="Multi-line select element." >}}

## Manual entry

{{< admonition type="note" >}}
The Business Variable panel supports this feature starting from version 3.0.0.
{{< /admonition >}}

In the **Minimize** display mode, you can allow users to enter values manually.

{{< video-embed src="/media/docs/grafana/panels-visualizations/business-variable/manual.mp4" >}}

To allow manual entry, set the **Values > Allow custom values** parameter to **Enabled**. The default setting is **Disabled**.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/manual.png" class="border" alt="The Allow Custom values parameter is available for the Minimize display mode." >}}

### Dependent variables

Enabling the Allow custom values parameter can cause unexpected behavior between dependent variables.

Two panels display variables that depend on each other. The `State dropdown` panel options depend on the selected `Country` variable.

If you enable the **Allow custom values** option for the `State dropdown` panel, unexpected options might appear for certain variables.

{{< video-embed src="/media/docs/grafana/panels-visualizations/business-variable/unexpected-behavior.mp4" >}}

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/dep-panels.png" class="border" alt="Two panels with dependent variables." >}}

To avoid this behavior, set the `Country dropdown` panel's **Select dependent variable to reset** option to `state`.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/select-dep-variable-to-reset.png" class="border" alt="Select dependent variable to reset." >}}

## Maximum visible values

{{< admonition type="note" >}}
The Business Variable panel supports this feature starting from version 3.0.0.
{{< /admonition >}}

**Values > Maximum visible values** is available when **Business Variable > Display mode** is set to **Minimize**.

This parameter helps when users select several options in the variable panel. In the following example (left screenshot), the variable panel takes up too much screen space and distorts the dashboard layout.

You can set the maximum number of visible on-screen options to prevent this issue.

In the right screenshot, the **Maximum visible values** parameter is set to 3. The Business Variable panel displays as one line—closer to what you expect from the **Minimize** mode. Three options remain visible: Singapore, Stockholm, and Tokyo. The remaining options are collected into (+21).

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/max-visible-value.png" class="border" alt="Parameter: Maximum visible values." >}}
