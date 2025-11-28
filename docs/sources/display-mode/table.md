---
title: Table
description: Learn how to use the Table display mode to create single variable lists,
  multi-level TreeViews, and hierarchical structures with status indicators.
keywords:
- business variable
labels:
  products:
  - cloud
  - enterprise
  - oss
weight: 100
---

# Table

The **Table** mode provides many variations, from a simple single variable view to an advanced TreeView.

## Single variable

With minimal configuration, your Business Variable panel can display as a simple list. Whether multiple selections are allowed depends on the settings you choose in the variable configuration menu. In the following example, multiple selections and the **Include All** option are allowed.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/basic.png" max-width="150px" class="border" alt="Basic Business Variable panel view." >}}

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/basic-edit.png" class="border" alt="How to set up the Basic Business Variable panel view." >}}

## Single variable plus statuses

To add a status circle, complete the following steps:

1. Connect the data source that retrieves two fields: a variable name and a numeric value.
2. Configure thresholds by specifying colors for data ranges.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/basic-plus.png" max-width="150px" class="border" alt="Basic Business Variable panel view plus circle statuses." >}}

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/basic-plus-edit.png" class="border" alt="How to set up the Basic Variable panel view plus circle statuses." >}}

## Multiple variables view

This configuration is similar to the previous one. The differences are:

- The dashboard variables connect to one another.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/four-vars.png" class="border" alt="Four dashboard variables to create a hierarchical structure." >}}

- Every level selection is a separate Business Variable panel.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/multiple.png" class="border" alt="Multi variables view plus circle statuses." >}}

## TreeView

You can display the Multiple variables view as a TreeView structure.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/treeview.png" max-width="150px" class="border" alt="Tree View plus circle statuses." >}}

The **TreeView** display mode consists of _groups_, which are usually called _tabs_.
Start by creating at least one **New Group** and assigning a dashboard variable to the **Select variable to display** parameter.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/start.png" class="border" alt="For the TreeView, at minimum, add one group/tab and specify one dashboard variable name." >}}

To display tab names, add at least two tabs.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/add-tabs.png" class="border" alt="Add at least two groups/tabs to have their names displayed." >}}

### TreeView levels

To create a TreeView with levels, create a dashboard variable for each level.

For example, to create a four-level TreeView (Country > State > City > Device), you need four dashboard variables:

- `country` is the first TreeView level.
- `state` represents the second level and updates with every `country` refresh.
- `city` is the third level and updates with every `state` or `country` refresh.
- `device` is the fourth level and updates with every `state`, `country`, or `city` refresh.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/four-vars.png" class="border" alt="Four dashboard variables to create a hierarchical TreeView structure." >}}

In the Business Variable panel options, add four TreeView levels. Ensure the level names match the dashboard variable names they represent.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/levels.png" class="border" alt="Hierarchical TreeView structure." >}}

The following example shows a TreeView with status circles.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/treeview-edit.png" class="border" alt="How to set up the Tree View plus circle statuses." >}}

### Multi-level selection

In the **Groups** category, when you enable the **Allow multi-level selection** parameter, selecting a group root automatically selects all elements in the group.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/group-selection.png" class="border" alt="Selection of a group automatically selects all elements in this group." >}}

### TreeView groups and tabs

The following TreeView has two groups or tabs. To add a new group or tab, use the **New Group** parameter.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/tabs.png" class="border" alt="A TreeView group consists of levels." >}}

### Collapse and expand on initial load

{{< admonition type="note" >}}
The Business Variable supports the Collapse/Expand feature starting from version 3.4.0.
{{< /admonition >}}

You can control how your TreeView appears when the dashboard opens.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/col-exp.png" class="border" alt="Collapse or expand on initial load." >}}

### Tabs order

{{< admonition type="note" >}}
The Business Variable supports the Tabs order feature starting from version 3.4.0.
{{< /admonition >}}

When you have multiple tabs, you can specify their order in the **Tab order** parameter:

- **In order**: The tabs always appear in the same order as they appear in the panel options.
- **Selected first**: The selected tab always appears first.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/order.png" class="border" alt="Specify the order of the tabs." >}}

## Dashboard variable name display

You can enable an option to display the variable name in front of the value to provide additional context for users.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/varname-disp.png" class="border" alt="The variable names can be made visible by using the Display variable name parameter." >}}

## Favorites

The Business Variable panel lets you select values as favorites. The favorite icon in the header lets you filter all favorites for quick navigation and selection.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/favorites.png" class="border" alt="Selected values are unique for each user and stored in the Web browser's storage." >}}

{{< admonition type="note" >}}
Before version 3.4.0, you could only store favorites in a web browser.
Starting from version 3.4.0, you can also store favorites in a data source.
{{< /admonition >}}

### Store favorites in a data source

Storing favorites in the browser works well in many cases. All favorites are unique for each user.

However, some users work with Grafana dashboards on multiple devices and browsers or need to clear their cookies frequently.

These users can store their favorites in a data source.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/fav.png" class="border" alt="Data Source option allows to store your favorites in a data source." >}}

SQL to create the table in the following example:

```sql
CREATE TABLE favorites (
    id serial primary key,
    variable text NOT NULL,
    value text NOT NULL,
    user_id integer NOT NULL
);
```

Example of favorites table data:

| id  | variable | value   | user_id |
| --- | -------- | ------- | ------- |
| 2   | device   | Device5 | 1       |
| 3   | device   | Device3 | 1       |

#### Get items query

```sql
select * from favorites where user_id=${__user.id};
```

#### Add item query

```sql
INSERT INTO favorites(variable, value, user_id)
VALUES ('${payload.variable}', '${payload.value}', ${__user.id})
```

#### Delete item query

```sql
DELETE FROM favorites WHERE id=${payload.id}
```

## Sticky option

Enable the **Sticky** option to keep the Business Variable panel in sight. The panel won't scroll out of view.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/sticky.png" class="border" alt="The Sticky option is available for the Table display mode." >}}

{{< video-embed src="/media/docs/grafana/panels-visualizations/business-variable/sticky.mp4" >}}

## Search

### Clean filter value button

{{< admonition type="note" >}}
The Business Variable panel supports this feature starting from version 2.2.0.
{{< /admonition >}}

When you start typing in the search text field, you can remove all entered characters by clicking the X button that appears in the far-right corner of the search field.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/clean.png" max-width="500px" class="border" alt="Clean filter value button in the search field." >}}

### Always visible search option

{{< admonition type="note" >}}
The Business Variable panel supports this feature starting from version 2.2.0.
{{< /admonition >}}

You can use the **Always Visible search** option to prevent users from hiding the search text area.

When this option is **Disabled**, the funnel icon appears on the dashboard. Users can click the funnel icon to show or hide the search text area.

When this option is **Enabled**, the funnel icon is hidden and users can't hide the search text area.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/hide-search.png" class="border" alt="Always visible search is a new feature." >}}

## Total and selected values count

{{< admonition type="note" >}}
The Business Variable panel supports this feature starting from version 3.0.0.
{{< /admonition >}}

In the **Table** display mode, you can choose to display total and selected values count for multi-select variables. To see this parameter, set **Header** to the **Display** mode.

This parameter enables or disables the count display. The total count appears next to the header in gray text. The first number shows how many values are selected. The second number shows how many values are available for selection in total.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/total.png" class="border" alt="Total and selected values on the dashboard." >}}

## Tab auto-grouping

{{< admonition type="note" >}}
The Business Variable panel supports this feature starting from version 3.0.0.
{{< /admonition >}}

The auto-group tab feature adds more sophistication to the Business Variable panel. When too many tabs are side by side, the panel collects the overflowing tabs and displays three vertical dots instead. When you click the dots, you see the remaining tabs in a dropdown.

The Business Variable panel moves the selected tab to the far left among all other tabs.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/tab.png" class="border" alt="Auto tab grouping and shifting the selected tab to the left." >}}

## Selected tab preservation

{{< admonition type="note" >}}
The Business Variable panel supports this feature starting from version 3.0.0.
{{< /admonition >}}

You might have cloned Business Variable panels across many dashboards. When you use this setup, users can [switch to a different dashboard](https://volkovlabs.io/blog/variable-panel-2.2.0-20231130/#dashboard-redirect-option) seamlessly. To enhance the user experience, you can save the selected tab when redirecting users and open the new dashboard with the previously selected tab.

To configure tab preservation, use the **Selected group id** parameter from the **Groups** category. Choose a unique word and specify it across all dashboards where you have the Business Variable panel and need to preserve the selected tab.

In the following example, three different dashboards have an identical Business Variable panel. All three Business Variable panels use the word _device_ in the **Selected group id** parameter.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/tab-pres.png" class="border" alt="Selected tab preservation configuration." >}}

## Custom image for the Grafana thresholds

{{< admonition type="note" >}}
The Business Variable supports the Custom image feature starting from version 3.4.0.
{{< /admonition >}}

Grafana thresholds provide better visual representation of data on your dashboard. You can enhance thresholds by specifying an SVG image instead of a simple colored circle:

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/img.png" class="border" alt="Specify image for a better visual thresholds representation." >}}

## Advanced: Select dependent variable to reset

{{< admonition type="note" >}}
The Business Variable panel supports this feature starting from version 3.0.0.
{{< /admonition >}}

The **Select dependent variable to reset** option is for advanced Business Variable panel users. This option bypasses some default Grafana functionality.

Grafana saves dashboard variable values for better performance and reuses them whenever possible. This is usually helpful, but in some scenarios, it doesn't provide the best user experience.

To better understand this parameter, review the following concepts:

- _dashboard variable_
- _dashboard variable query_
- _selected current value_
- _dashboard variable refresh/update_
- _dashboard variable reset_

A [_dashboard variable_](https://volkovlabs.io/grafana/variables/) is a set of values retrieved following rules set by a dashboard developer. For simplicity, we call these rules a _dashboard variable query_.

A _dashboard variable_ can have a _selected current value_ (or values).

A _dashboard variable refresh/update_ occurs when the _dashboard variable query_ runs to retrieve the full set of values. If a _selected current value_ existed previously, Grafana assigns it again after the refresh/update.

Thus, a _dashboard variable refresh/update_ has two steps.

The **Select dependent variable to reset** option tells Grafana to perform only the first step: rerun the _dashboard variable query_ and skip the second step (don't assign a _selected current value_).

The first step without the second step is called a _dashboard variable reset_.

The **Select dependent variable to reset** option links two _dashboard variables_ and tells Grafana to reset one of them after you change the value of the first one.

The following two scenarios provide use cases for when _dashboard variable reset_ is needed.

### Scenario 1

In this scenario, two dashboard variables exist:

- `device`, which uses the following query:

```sql
 select name from device_time;
```

- `type`, which uses the following query that depends on the first variable:

```sql
select value from device_time where name='$device';
```

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/reset-var.png" class="border" alt="Two dashboard variables. One is dependent on the other." >}}

With this configuration, whenever you update the `device` variable (by selecting a value in the dashboard dropdown), the `type` variable automatically refreshes/updates. This means the query to populate the `type` variable runs with every `device` variable value update.

In the following example, some `type` variable values overlap:

```text
- device 1, type in ('1', '2', '3')
- device 2, type in ('2', '3')
- device 3, type in ('3')
```

The value '3' is common for all devices. The value '2' is shared by device 1 and device 2. The value '1' is unique to the first device.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/values.png" class="border" alt="Some of the `type` variable values overlap between devices." >}}

If you set `type` to '3', then when you switch devices in the `device` variable, you always see '3' in the `type` variable. The `type` variable refreshes/updates (the underlying query reruns), and then Grafana sets it to '3' (the previously selected value).

{{< video-embed src="/media/docs/grafana/panels-visualizations/business-variable/reset-no.mp4" >}}

If you set `type` to 1 (a non-overlapping value unique to one device), then when you switch the `device` variable, the `type` refreshes/updates (the underlying query reruns) and the first retrieved value appears. Grafana can't set the previously selected value because that value doesn't exist for device 2 and device 3.

{{< video-embed src="/media/docs/grafana/panels-visualizations/business-variable/reset-yes.mp4" >}}

The **Select dependent variable to reset** parameter ensures that overlapping values don't matter.

The variable name you specify in **Select dependent variable to reset** always resets, and the displayed value comes from the first retrieved value, not from previous selections.

### Scenario 2

Variables don't have to depend on each other. In this scenario, the `type` variable has the **Custom** type. Values are specified directly, separated by commas.

{{< figure src="/media/docs/grafana/panels-visualizations/business-variable/comma.png" class="border" alt="Two independent dashboard variables." >}}

With the **Custom** dashboard variable type, the two dashboard variables aren't linked and act independently. This means refreshing/updating the `device` variable doesn't affect the `type` variable.

In this scenario, using the **Select dependent variable to reset** parameter is the only way to trigger the `type` variable reset when the `device` variable refreshes/updates.
