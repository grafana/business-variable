# Business Variable for Grafana
[![CI](https://github.com/grafana/business-variable/actions/workflows/push.yml/badge.svg)](https://github.com/grafana/business-variable/actions/workflows/push.yml)
[![CD](https://github.com/grafana/business-variable/actions/workflows/publish.yml/badge.svg)](https://github.com/grafana/business-variable/actions/workflows/publish.yml)
[![License](https://img.shields.io/github/license/grafana/business-variable)](https://github.com/grafana/business-variable/blob/main/LICENSE)

>This project was originally contributed by [Volkov Labs](https://github.com/volkovlabs/business-variable) - thanks for all your great work!
>
>We have republished under the same plugin ID, keeping the community signature. This means you can simply update your plugin version. A new ID would have required manual updates to your dashboards. For additional information on the changes, see the [Notices](https://github.com/grafana/business-variable/blob/main/NOTICES.md).

This project is currently maintained by Grafana Labs. We welcome pull requests and will review them on a best-effort basis. If you're interested in taking on this project long-term, contact [integrations@grafana.com](mailto:integrations@grafana.com). We're eager to work with new maintainers and eventually hand over the project.

**Business Variable** transforms how you interact with Grafana dashboard variables. Place it anywhere on your dashboard and choose from multiple layouts, including an advanced **TreeView** option, to simplify filtering and boost usability.

## 🚀 Key Features

- **Display Modes**: Choose from Table, Minimize, Button, or Slider layouts.
- **TreeView**: Hierarchical data visualization within Table mode for complex nested variables.
- **Thresholds**: Highlight statuses using data source thresholds for visual clarity.
- **Variable Support**: Handle single or multi-value variables with an "All" option.
- **Filtering**: Apply pattern-based or favorite-based value filtering to quickly find options.
- **Sticky Positioning**: Panel follows scrolling for easy access across long dashboards.
- **Tabbed TreeViews**: Organize multiple TreeViews into groups or tabs for better organization.
- **Input Box**: Support for text input variables with custom validation.
- **Responsive Design**: Adapts seamlessly to different screen sizes and panel dimensions.
- **Theming**: Fully compatible with Grafana's light and dark themes.

## 📋 Requirements

| Plugin Version                | Compatible Grafana Versions |
| ----------------------------- | --------------------------- |
| **Business Variable 5.x**     | Grafana 11.5 or 12          |
| **Business Variable 4.x**     | Grafana 11 or 12            |
| **Business Variable 3.x**     | Grafana 10.3 or 11          |
| **Business Variable 1.x/2.x** | Grafana 9.2 or 10           |

## 🛠️ Installation

Install the Business Variable panel through the [Grafana Plugins Catalog](https://grafana.com/grafana/plugins/volkovlabs-variable-panel/) or using the Grafana CLI:

```bash
grafana-cli plugins install volkovlabs-variable-panel
```

After installation, restart Grafana and add the **Business Variable** panel to your dashboard.

## 📚 Documentation

Dive into detailed guides to make the most of Business Variable:

| Section                                                                   | Description                          |
| ------------------------------------------------------------------------- | ------------------------------------ |
| [Data Flow](https://volkovlabs.io/plugins/business-variable/data-flow/)   | Understand the panel's data flow     |
| [Display Modes](https://volkovlabs.io/plugins/business-variable/layout/)  | Explore layout customization options |
| [Features](https://volkovlabs.io/plugins/business-variable/features/)     | Learn about key capabilities         |
| [Tutorials](https://volkovlabs.io/plugins/business-variable/tutorials/)   | Follow step-by-step guides           |
| [Release Notes](https://volkovlabs.io/plugins/business-variable/release/) | Stay updated with recent changes     |

## 📜 License

This project is licensed under the [Apache License 2.0](https://github.com/grafana/business-variable/blob/main/LICENSE).
