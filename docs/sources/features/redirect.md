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

This feature allows opening the corresponding dashboard to a variable value. It is useful, for instance, if a variable panel displays a list of some devices where every device requires a specific dashboard.

When a user selects a device in the Business Variable panel, the corresponding dashboard opens. With that, the dashboard switch is not obvious to the users. For them, it might seem they stay in one place.

Find below how to make it work.

<Shorts id="TtC2bh7a4fE" title="Business Variable panel 2.2.0 for Grafana." />

{{< youtube id="TtC2bh7a4fE" >}}

## Map dashboard variables

Create two dashboard variables:

- One to retrieve all devices.
- The other one to hold one `dashboard_id` at a time following the device from the first variable.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/vars.png" class="border" alt="The dashboardid variable depends on the device variable." >}}

## Dashboards

Create device-specific dashboards with an identical variable panel on each dashboard.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/switch-dash.png" class="border" alt="Create device-specific dashboards with an identical variable panel." >}}

## Variable panel

In the Business Variable panel options, specify a value for the **Dashboard**->**Select variable with dashboard UID**.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/var-conf.png" class="border" alt="Select variable with dashboard UID: parameter to specify a dashboard unique identifier." >}}

After the above-presented configuration, the Business Variable panel switches dashboards when a user selects a device. A sleek transition makes the user experience smooth and pleasant.
