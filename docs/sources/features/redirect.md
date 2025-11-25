---
title: Redirect dashboards
description: Learn how to configure dashboard redirects that open corresponding dashboards
  based on variable value selections.
keywords:
- business variable
labels:
  products:
  - cloud
  - enterprise
  - oss
weight: 500
---

# Redirect dashboards

{{< admonition type="note" >}}
Variable panel supports redirects since version 2.2.0.
{{< /admonition >}}

{{< video-embed src="/media/docs/grafana/panels-visualizations/business-variable/dashboard-redirect.mp4" >}}

This feature lets you open a corresponding dashboard when you select a variable value. This is useful when a variable panel displays a list of devices and each device requires a specific dashboard.

When you select a device in the Business Variable panel, the corresponding dashboard opens. The dashboard switch is seamless, so users might not realize they switched dashboards.

The following video shows how to configure this feature.

{{< youtube id="TtC2bh7a4fE" >}}

## Map dashboard variables

Create two dashboard variables:

- One to retrieve all devices.
- Another to hold one `dashboard_id` at a time following the device from the first variable.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/vars.png" class="border" alt="The dashboard id variable depends on the device variable." >}}

## Dashboards

Create device-specific dashboards with an identical variable panel on each dashboard.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/switch-dash.png" class="border" alt="Create device-specific dashboards with an identical variable panel." >}}

## Variable panel

In the Business Variable panel options, specify a value for **Dashboard > Select variable with dashboard UID**.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/var-conf.png" class="border" alt="Select variable with dashboard UID: parameter to specify a dashboard unique identifier." >}}

After this configuration, the Business Variable panel switches dashboards when you select a device. A smooth transition provides a seamless user experience.
