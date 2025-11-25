---
tags:
  - Business Variable
image: /img/plugins/business-variable/dashboard.png
hide_table_of_contents: true
title: 'Business Variable'
description: 'Learn how to use the Business Variable panel to create customizable dashboard filters with multiple display modes and layouts.'
labels:
  products:
    - enterprise
    - oss
weight: 10
---

# Business Variable

The Business Variable panel builds on top of the regular dashboard variables. It allows you to have dashboard filters in a separate panel, which you can place anywhere on the dashboard.

The Business Variable panel offers many layouts with robust options, including an advanced TreeView layout. With the latest updates, users can [switch between dashboards](/plugins/business-variable/redirect), which adds to the satisfying user experience.

## Requirements

- Business Variable panel 4.X requires **Grafana 11** or **Grafana 12**.
- Business Variable panel 3.X requires **Grafana 10** or **Grafana 11**.
- Variable panel 1.X, 2.X requires **Grafana 9.2** or **Grafana 10**.

## Getting Started

The Business Variable panel can be installed from the [Grafana Catalog](https://grafana.com/grafana/plugins/volkovlabs-variable-panel/) or utilizing the Grafana command line tool.

<Youtube
  id="1qYzHfPXJF8"
  title="Install Business Suite plugins in Cloud, OSS, Enterprise. Getting started with the Business Suite."
/>

For the latter, please use the following command.

```sh
grafana cli plugins install volkovlabs-variable-panel
```

## Highlights

- Allows working with dashboard variables in the **Table**, **Minimize**, **Button**, and **Slider** display modes.
- The **Table** display mode can be configured into a TreeView.
- Displays statuses based on thresholds from data sources.
- Supports single and multi-value variables with the All option.
- Allows filtering values by pattern and selected favorites.
- Supports follow when scrolling (**Sticky position**).
- Supports multiple TreeViews using groups/tabs.
- Supports the input text (**Input box**) variables.

## Tutorial

This video reviews the latest features introduced in Business Variable 3.0.0.

Daria demonstrates many new options for the **Minimize** mode, such as

- allow empty value,
- allow custom values,
- maximum visible values.

For the **Table** mode, she explains how to display total and selected counts.
Further, Daria introduces a **Slider** mode and touches upon the TreeView layout improvements and advanced features.

<Youtube
  id="vcdcLDVQYek"
  title="New features and updates in Business Variable 3.0.0."
/>

For the all plugin options overview, please refer the other video.

<Youtube
  id="1ogv2jstrlI"
  title="Variable Panel for Grafana. New features and updates in 2.3.1."
/>

We have many other tutorials that you can find helpful. You can review all related to this plugin tutorials [here](/plugins/business-variable/tutorials).

## Documentation

| Section                   | Description                              |
| ------------------------- | ---------------------------------------- |
| [Data Flow](data-flow/)   | Explains the Business Variable data flow |
| [Display Modes](layout/)  | Explains different display modes         |
| [Features](features)      | Explains panel features                  |
| [Tutorials](tutorials)    | Easy to follow tutorials                 |
| [Release Notes](release/) | The latest features and updates          |

## License

Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/business-variable/blob/main/LICENSE).

<Feedback />
