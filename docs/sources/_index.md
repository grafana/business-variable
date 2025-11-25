---
title: Business Variable
description: Learn how to use the Business Variable panel to create customizable dashboard
  filters with multiple display modes and layouts.
labels:
  products:
  - cloud
  - enterprise
  - oss
weight: 10
---

# Business Variable

The Business Variable panel builds on top of regular dashboard variables. You can place dashboard filters in a separate panel anywhere on the dashboard.

The Business Variable panel offers many layouts with robust options, including an advanced TreeView layout. With the latest updates, you can [switch between dashboards](/plugins/business-variable/redirect) for a better user experience.

## Requirements

- Business Variable panel 4.X requires **Grafana 11** or **Grafana 12**.
- Business Variable panel 3.X requires **Grafana 10** or **Grafana 11**.
- Variable panel 1.X, 2.X requires **Grafana 9.2** or **Grafana 10**.

## Getting started

The Business Variable panel can be installed from the [Grafana Catalog](https://grafana.com/grafana/plugins/volkovlabs-variable-panel/) or utilizing the Grafana command line tool.

{{< youtube id="1qYzHfPXJF8" >}}

To install using the command line, run the following command:

```sh
grafana cli plugins install volkovlabs-variable-panel
```

## Highlights

- Work with dashboard variables in the **Table**, **Minimize**, **Button**, and **Slider** display modes.
- Configure the **Table** display mode as a TreeView.
- Display statuses based on thresholds from data sources.
- Use single and multi-value variables with the All option.
- Filter values by pattern and selected favorites.
- Enable the panel to follow when scrolling (**Sticky position**).
- Create multiple TreeViews using groups and tabs.
- Use input text (**Input box**) variables.

## Tutorial

This video reviews the latest features in Business Variable 3.0.0.

The video demonstrates many new options for the **Minimize** mode, such as:

- Allow empty value,
- Allow custom values,
- Maximum visible values.

For the **Table** mode, the video explains how to display total and selected counts.
The video also introduces the **Slider** mode and covers TreeView layout improvements and advanced features.

{{< youtube id="vcdcLDVQYek" >}}

For an overview of all plugin options, watch the following video.

{{< youtube id="1ogv2jstrlI" >}}

To learn more about this plugin, see [Tutorials](/plugins/business-variable/tutorials).

## Documentation

| Section                   | Description                              |
| ------------------------- | ---------------------------------------- |
| [Data flow](data-flow/)   | Explains the Business Variable data flow |
| [Display mode](layout/)  | Explains different display modes         |
| [Features](features)      | Explains panel features                  |
| [Tutorials](tutorials)    | Easy to follow tutorials                 |
| [Release notes](release/) | The latest features and updates          |

## License

Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/business-variable/blob/main/LICENSE).
