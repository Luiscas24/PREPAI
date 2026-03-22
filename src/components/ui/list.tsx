"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const List = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
)
List.displayName = "List"

const ListItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li"> & {
    button?: boolean
  }
>(({ className, button = false, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(
      "flex w-full items-center gap-2 border-b p-4 text-left last:border-b-0",
      button &&
        "cursor-pointer transition-colors hover:bg-muted/50 active:bg-muted",
      className
    )}
    {...props}
  />
))
ListItem.displayName = "ListItem"

const ListItemTitle = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("font-medium text-foreground", className)}
    {...props}
  />
))
ListItemTitle.displayName = "ListItemTitle"

const ListItemDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
ListItemDescription.displayName = "ListItemDescription"

const ListItemAddon = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex shrink-0 items-center justify-center text-muted-foreground [&>svg]:size-5",
      className
    )}
    {...props}
  />
))
ListItemAddon.displayName = "ListItemAddon"

const ListItemAction = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      ref={ref}
      className={cn("ml-auto", className)}
      {...props}
    />
  )
})
ListItemAction.displayName = "ListItemAction"

export {
  List,
  ListItem,
  ListItemTitle,
  ListItemDescription,
  ListItemAddon,
  ListItemAction,
}
