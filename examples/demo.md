# Markawesome Syntax Examples

This file demonstrates all the markawesome syntax patterns.

## Callouts

:::info
This is an info callout with **bold text** and [links](https://example.com).
:::

:::success
This is a success callout.
:::

:::warning
This is a warning callout.
:::

:::danger
This is a danger callout.
:::

:::neutral
This is a neutral callout.
:::

## Cards

===
# Basic Card
This is a basic card with just content.
===

===filled
![Hero Image](https://via.placeholder.com/800x400)
# Featured Content
This card includes both an image and a title.
[Learn More](https://example.com)
===

===plain
# Plain Card
This card uses the plain appearance.
===

## Comparison

|||50
![Before](https://via.placeholder.com/600x400/cccccc/666666?text=Before)
![After](https://via.placeholder.com/600x400/4CAF50/ffffff?text=After)
|||

## Carousel

~~~~~~navigation pagination loop
~~~
![Slide 1](https://via.placeholder.com/800x400/e3f2fd/1976d2?text=Slide+1)
~~~
~~~
![Slide 2](https://via.placeholder.com/800x400/f3e5f5/7b1fa2?text=Slide+2)
~~~
~~~
![Slide 3](https://via.placeholder.com/800x400/e8f5e9/388e3c?text=Slide+3)
~~~
~~~~~~

## Details

^^^filled
Click to expand this summary
>>>
This is the detailed content that can be collapsed and expanded.

You can include:
- Lists
- **Bold text**
- [Links](https://example.com)
- Code blocks
^^^

^^^plain start
Summary with icon on the start
>>>
The expand/collapse icon appears on the left side
^^^

## Dialog

???light-dismiss
Open Dialog
>>>
# Welcome

This is the content inside the modal dialog.

[Close](#)
???

## Tabs

++++++top
+++ Features
Learn about the key features:

- Feature 1
- Feature 2
- Feature 3
+++
+++ Documentation
Read the comprehensive documentation here.
+++
+++ Support
Get help from our support team.
+++
++++++

## Tags

@@@brand
Version 2.0
@@@

@@@success
Completed
@@@

@@@warning
In Progress
@@@

## Copy Buttons

<<<
npm install markawesome
<<<

<<<
**Copy** this text with *markdown* formatting and `code`
<<<

## Badges

!!!brand
New
!!!

!!!success
Active
!!!

!!!danger
Critical
!!!

## Buttons

%%%primary
[Get Started](https://example.com)
%%%

%%%danger
[Delete Account](https://example.com)
%%%

## Alternative Syntax

:::wa-callout info
This uses the alternative syntax for callouts.
:::

:::wa-card filled
# Card Title
This uses the alternative syntax for cards.
:::

:::wa-tag success
Success Tag
:::
