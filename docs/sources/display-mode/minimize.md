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

Select **Minimize** if you plan to have the native select look and need to place it anywhere on your dashboard.

The minimized mode works for Query and Custom variables.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/query-custom.png" class="border" alt="The minimized mode works for Query and Custom variables." >}}

In the minimized mode the variable panel allows updating (selecting another value) dashboard variables without occupying valuable top space since you can place it anywhere on the dashboard.

In the example below, there are four Business Variable panels. They are located on the top right and provide a selection of Regions, Countries, States, and Markets.

<Image
  title="Example of the elegant space screen space saving."
  src="/img/blog/2023-07-26-variable-panel-1.6.0/select.gif"
/>

## Single or multi-value variables

Following the variable options, users are allowed to select a single or multi-value variable.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/multi.png" class="border" alt="Single and multi-value variables in the minimized mode." >}}

When needed, the minimized mode extends to a multi-line element.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/minimize.png" class="border" alt="Multi-line select element." >}}

## Manual entry

{{< admonition type="note" >}}
The Business Variable panel supports this feature starting from version 3.0.0.
{{< /admonition >}}

In the **Minimize** display mode, you can allow users to enter the values manually.

<Image
  title="Manual data entry is possible when the new parameter is enabled."
  src="/img/blog/2024-06-01-variable-panel-3.0.0/manual.gif"
  width="60%"
/>

Set the **Values**->**Allow custom values** parameter to **Enabled** to allow manual entry. By default, it is set to **Disabled**

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/manual.png" class="border" alt="The Allow Custom values parameter is available for the Minimize display mode." >}}

### Dependent variables

Set the Allow custom values parameter to Enabled may call unexpected behavior between depending variables.

Two panels show variables that are dependent on each other. For the `State dropdown` panel, available options are depending on the selected `Country` variable.

If we enable the **Allow custom values** option for the `State dropdown` panel, it causes options to appear that we do not expect to see for certain variables.

<Image
  title="State dropdown has move options than allowed by the Country variable."
  src="/img/plugins/business-variable/unexpected-behavior.gif"
/>

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/dep-panels.png" class="border" alt="Two panels with dependent variables." >}}

To avoid this behavior, for the `Country dropdown` panel set `Select dependent variable to reset` option to `state`.

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/select-dep-variable-to-reset.png" class="border" alt="Select dependent variable to reset." >}}

## Maximum visible values

{{< admonition type="note" >}}
The Business Variable panel supports this feature starting from version 3.0.0.
{{< /admonition >}}

**Values**->**Maximum visible values** is available when the **Business Variable**->**Display mode** is set to **Minimize**.

This parameter is helpful when your users select several options in the variable panel, as shown below (print screen on the left). In that event, the variable panel might take up too much screen space and distort the dashboard layout.

You have the flexibility to set the maximum number of visible on-screen options to avoid that.

For instance, in the picture below (print-screen on the right), the **Maximum visible values** parameter is set to 3, and the Business Variable panel looks more like what you expect from the **Minimize** mode - one line. Three options are left: Singapore, Stockholm, and Tokyo. The remaining are collected into (+21).

{{< figure src="/media/docs/grafana/panels-visualizations/business-forms/max-visible-value.png" class="border" alt="Parameter: Maximum visible values." >}}
