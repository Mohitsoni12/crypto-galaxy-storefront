
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  primary?: boolean;
}

const walletOptions: WalletOption[] = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjM1NSIgdmlld0JveD0iMCAwIDM5NyAzNTUiIHdpZHRoPSIzOTciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMSAtMSkiPjxwYXRoIGQ9Im0xMTQuNjIyNjQ0IDMyNy4xOTU0NzIgNTIuMDA0NzE3IDEzLjgxMDE5OHYtMTguMDU5NDlsNC4yNDU0ODMtNC4yNDU0ODNoMjkuNzE4Mzc4djIxLjI0NjM1OSA2My42ODIyNjVsLTMxLjgzOTYyNi0yMS4yNDYzNTktNTQuMTI1OTY2LTE4LjA1OTQ5eiIgZmlsbD0iI2NkYmRiMiIvPjxwYXRoIGQ9Im0xOTkuNTI4MzAyIDMyNy4xOTU0NzIgNTAuOTQzMzk2IDEzLjgxMDE5OHYtMTguMDU5NDlsNC4yNDU0ODMtNC4yNDU0ODNoMjkuNzE4Mzc5djIxLjI0NjM1OSA2My42ODIyNjVsLTMxLjgzOTYyNi0yMS4yNDYzNTktNTQuMTI1OTY3LTE4LjA1OTQ5eiIgZmlsbD0iI2NkYmRiMiIgdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIDEgNDgzLjk2MjQ4IDApIi8+PHBhdGggZD0ibTE3MC41NzA0MjUgMjg3Ljg4OTUyMy00LjI0NTQ4MyA3Ni40Mzc3MzYgNS4zMDY4NTQtNC4yNDU0ODNoNTUuMTg3MzM4bDYuMzY4MjI0IDQuMjQ1NDgzLTQuMjQ1NDgzLTc2LjQzNzczNi04LjQ5MDk2NS02LjM2ODIyNGgtNDIuNDU0ODI2eiIgZmlsbD0iIzM5MzkzOSIvPjxwYXRoIGQ9Im0xNDIuMDc5OTggOTEuMjk0NDU2LTMwLjc3ODI1NSA0NS4xNDYzMzUtMjcuNTk0OTYxIDQxLjk2MTg4OSAyMC4xODQ5ODggMTI3LjI3MTUxNiA4LjQ5MDk2NiA0LjI0NTQ4MyA0NS4xNDYzMzUtMjEuMjQ2MzU5IDMuMTg0MTEyLTM3Ljc4NTMwNHYtMTE4Ljc4MDU1bC0zLjE4NDExMi0zMWgtMTEuNjc1MDc3eiIgZmlsbD0iI2Y4OWMzNSIvPjxwYXRoIGQ9Im0zMjcuMDczOTggOTEuMjk0NDU2IDMwLjc3ODI1NSA0NS4xNDYzMzUgMjcuNTk0OTYgNDEuOTYxODg5LTIwLjE4NDk4NyAxMjcuMjcxNTE2LTguNDkwOTY2IDQuMjQ1NDgzLTQ1LjE0NjMzNS0yMS4yNDYzNTktMy4xODQxMTItMzcuNzg1MzA0di0xMTguNzgwNTVsMy4xODQxMTItMzFoMTUuOTIwNTZ6IiBmaWxsPSIjZjg5ZDM1IiB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAgMSA2NTUuMjA4IDApIi8+PHBhdGggZD0ibTE2OS41MDkwNTQgMTgzLjY1MDA3NC04Ljc5MTM4OCA2My42ODIyNjYgNjMuNjgyMjY2IDM4Ljg0NjY3NnoiIGZpbGw9IiNkODdjMzAiIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMCAxIDM5My45MDkgMCkiLz48cGF0aCBkPSJtMTk5LjUyODMwMiAyODcuODg5NTIzIDMwLjc3ODI1NiA4LjQ5MDk2NSAzNC40MTg5MzEtMjYuODA0MzQ4YzExLjA4MDQ2My0yMi41NjM0MTYgMTguMTI0ODIzLTM5LjgwMzA0IDIxLjEzMzA4LTUxLjcxODg3MmwtMS41OTIwNTYtNDAuMzY5ODMyLTYzLjY4MjI2NiAzOC44NDY2NzZ6IiBmaWxsPSIjZWI4ZjM1Ii8+PHBhdGggZD0ibTE3MC41NzA0MjUgOC4wNjU1NzQgNjMuODYxNzU5IDM0Ljk5MDc5NiA0LjkxMzUyNSAzMDMuMDQyMDk5LTkuNTUyMzM3LS42MzY4MjMtNTkuMjc0ODEtNDQuNTA5NTEyeiIgZmlsbD0iI2U4ODIxZSIvPjxwYXRoIGQ9Im0xOTkuNTI4MzAyIDE4NC4wODYyOTctODUuNTgzMDExIDMuNzYzODE1LTQyLjQ1NDgyNiA2OS4wNjAyNzd6IiBmaWxsPSIjZGY4YTMwIiB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAgMSAyNzEuMDE4IDApIi8+PHBhdGggZD0ibTE5OS41MjgzMDIgMTg0LjA4NjI5NyA4NS41ODMwMTEgMy43NjM4MTUgNDIuNDU0ODI2IDY5LjA2MDI3N3oiIGZpbGw9IiNkZjhhMzAiIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgNDQwLjk5NykiLz48cGF0aCBkPSJtMTEzLjAzMDQ0NyAyNS4xODMxMDIgMjU1LjU2OTMwNiAyLjgzMDUwOC0yMC4xODQ5ODcgOTEuMzUxNTQyLTY3LjkyNzc0OS0zLjc2MzgxNXoiIGZpbGw9IiNlODgyMWUiLz48cGF0aCBkPSJtMTk4LjQ2NjkzMSA4LjA2NTU3NC02OC4yNDgxNyAxMDQuNTkzNjc0IDI3LjU5NDk2MS0xMDIuNzQyNjcxeiIgZmlsbD0iI2Y4OWQzNSIvPjxwYXRoIGQ9Im0xOTYuMzQ0MTkxIDguMDY1NTc0IDY4LjI0ODE3IDEwNC41OTM2NzQtMjcuNTk0OTYyLTEwMi43NDI2NzF6IiBmaWxsPSIjZWI4ZjM1IiB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAgMSA0MzMuMzQxIDApIi8+PHBhdGggZD0ibTE0MC42MjU0MDggMTU0LjM2Nzg2My0zLjE4NDExMiA1OC45NzUzODIgNDAtOC40OTA5NjV6IiBmaWxsPSIjZWE4ZTNhIi8+PHBhdGggZD0ibTI4OC40MzAyNzMgMTU0LjM2Nzg2MyAzLjE4NDExMiA1OC45NzUzODItNDAuNjIxNDYzLTguNDkwOTY1eiIgZmlsbD0iI2VhOGUzYSIgdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIDEgNTM5LjYyNSAwKSIvPjxwYXRoIGQ9Im0xMzcuNDQxMjk2IDIxMS42NTMyMzYgMTguMDU5NDg5IDE3MS4zODUzOTgtODIuMzk4ODk5LTEzMi41Nzk0NTZ6IiBmaWxsPSIjZDg3YzMwIiB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAgMSAyMTAuNTQzIDApIi8+PHBhdGggZD0ibTI4OC40MzAyNzMgMjExLjY1MzIzNi0xOC4wNTk0ODkgMTcxLjM4NTM5OCA4Mi4zOTg5LTEzMi41Nzk0NTZ6IiBmaWxsPSIjZDg3YzMwIiB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAzNDAuODYgNTk0LjY5MikiLz48cGF0aCBkPSJtMTU1LjUwMDc4NSAyNjIuNTk3NzY3LTIzLjk2NTk4Ni00Ni4yMDc3MDUgMTQuNzg0NjQuMzY5NTd6IiBmaWxsPSIjY2U2ZDI4Ii8+PHBhdGggZD0ibTI3MC41NTQ3ODUgMjYyLjU5Nzc2NyAyMy45NjU5ODYtNDYuMjA3NzA1LTE0Ljc4NDY0LjM2OTU3eiIgZmlsbD0iI2NlNmQyOCIgdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIDEgNTQxLjA3NSAwKSIvPjwvZz48L3N2Zz4=",
    primary: true
  },
  {
    id: "rabby",
    name: "Rabby Wallet",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMi4wMDAzIDAuMTY2NjI2QzE2LjI0MjMgMC4xNjY2MjYgMTkuNzQxOCAyLjg2MTgxIDIwLjkxNzQgNi42MTM0MkgyMy44MzM3VjEwLjc5NzZIMjMuODMzN1YxMC44MDAzSDIzLjgzMzdWMTcuNTUwM0MyMy44MzM3IDE4LjU5MzkgMjIuOTgzNyAxOS40NDM5IDIxLjk0IDIwLjQ5MDNDMjAuODk2NCAyMS41MzY2IDE5LjU5MSAyMi44NDQ3IDE4Ljg2OTIgMjMuNTY2NEMxOC44MDY0IDIzLjYyOTIgMTguNzI1NiAyMy42NjY2IDE4LjY0MTcgMjMuNjY2NkgxOC42MzM3SDE3LjA2NjFIMTYuOTQxOUgxNi45MzM3VjIzLjY2NjZIOS4wMDAzN1YyMi4yMjIzQzkuMDAwMzcgMjEuNTQgOC40NDg0NSAyMC45ODgzIDcuNzY1OTQgMjAuOTg4M0M3LjA4MzQzIDIwLjk4ODMgNi41MzE1IDIxLjU0IDYuNTMxNSAyMi4yMjIzVjIzLjY2NjZIMTUuODk4MUgxNy4wNjYxTDE4LjAyNjQgMjIuNzA0M0MxOC42OTYzIDIyLjAzMjMgMTkuNzk4MSAyMC45Mjg0IDIwLjc5MTcgMTkuOTMxOUMyMS43ODU0IDE4LjkzNTQgMjIuMzg5MiAxOC4zNTgxIDIyLjM4OTIgMTcuNTUwM1YxMC44MDAzSDIwLjkxNDZDMTkuNzM2NiAxNC41NTA3IDE2LjI0MDkgMTcuMjQ0NSAxMi4wMDAzIDE3LjI0NDVDNy40MTA1IDE3LjI0NDUgMy42ODk2MyAxMy41MjM1IDMuNjg5NjMgOC45MzM2M0MzLjY4OTYzIDQuMzQzNzggNy40MTA1IDAuNjIyODUxIDEyLjAwMDMgMC42MjI4NTFDMTIuMjkwMiAwLjYyMjg1MSAxMi41NzY5IDAuNjM2NjU0IDEyLjg1OTUgMC42NjM3OUMxMi41NzY5IDAuMTY2NjI2IDEyLjI5MDIgMC4xNjY2MjYgMTIuMDAwMyAwLjE2NjYyNlpNMTIuMDAwMyAyLjA4OTA5QzguMjE5MTQgMi4wODkwOSA1LjE1NTk2IDUuMTUyMTggNS4xNTU5NiA4LjkzMzQ0QzUuMTU1OTYgMTIuNzE0NyA4LjIxOTE0IDE1Ljc3NzggMTIuMDAwMyAxNS43Nzc4QzE1Ljc4MTUgMTUuNzc3OCAxOC44NDQ3IDEyLjcxNDcgMTguODQ0NyA4LjkzMzQ0QzE4Ljg0NDcgNS4xNTIxOCAxNS43ODE1IDIuMDg5MDkgMTIuMDAwMyAyLjA4OTA5Wk0xMi4wMDAzIDUuMDIyMjZDMTQuMTU4OCA1LjAyMjI2IDE1LjkxMTUgNi43NzQ5NSAxNS45MTE1IDguOTMzNDRDMTUuOTExNSAxMS4wOTE5IDE0LjE1ODggMTIuODQ0NiAxMi4wMDAzIDEyLjg0NDZDMTAuNzU0NyAxMi44NDQ2IDkuNjQ4NzQgMTIuMjYxOSA4LjkzMTA0IDExLjM3OTlDOC4yMTMzNCAxMC40OTggNy43Nzc3OCA5LjM1NTc3IDcuNzc3NzggOC4xMjQ5OEM3Ljc3Nzc4IDYuODk0MiA4LjAyMjM3IDUuNjkxOTQgOC43OTU3OCA1LjAyMjI2SDEyLjAwMDNaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMzMzXzMzMTQpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMzMzXzMzMTQiIHgxPSIxMi4wMDA0IiB5MT0iMC4xNjY2MjYiIHgyPSIxMi4wMDA0IiB5Mj0iMjMuNjY2NiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjN0M4OUZGIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQzNEFDOCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo="
  },
  {
    id: "okx",
    name: "OKX Wallet",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzIwNzVfNTU3MTkpIj4KPHBhdGggZD0iTTAuNSAxMC42NjY3VjQuMDAwMDRINC41VjEwLjY2NjdIMC41WiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzIwNzVfNTU3MTkpIi8+CjxwYXRoIGQ9Ik0xMSAxMC42NjY3VjQuMDAwMDRIMTVWMTAuNjY2N0gxMVoiIGZpbGw9InVybCgjcGFpbnQxX2xpbmVhcl8yMDc1XzU1NzE5KSIvPgo8cGF0aCBkPSJNNS43NSAxNC40VjguMDAwMDRIOS43NVYxNC40SDUuNzVaIiBmaWxsPSJ1cmwoI3BhaW50Ml9saW5lYXJfMjA3NV81NTcxOSkiLz4KPHBhdGggZD0iTTUuNzUgNi40MDAwMlYwLjAwMDAxNkg5Ljc1VjYuNDAwMDJINS43NVoiIGZpbGw9InVybCgjcGFpbnQzX2xpbmVhcl8yMDc1XzU1NzE5KSIvPgo8L2c+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMjA3NV81NTcxOSIgeDE9IjMuMDA4MzMiIHkxPSI3LjUwNDk5IiB4Mj0iMC41IiB5Mj0iNy41MDQ5OSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMEZDQkVCIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzIxNzBGNSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MV9saW5lYXJfMjA3NV81NTcxOSIgeDE9IjEzLjUwOCIgeTE9IjcuNTA0OTkiIHgyPSIxMSIgeTI9IjcuNTA0OTkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzBGQ0JFQiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMyMTcwRjUiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDJfbGluZWFyXzIwNzVfNTU3MTkiIHgxPSI4LjI1ODMzIiB5MT0iMTEuNDI2NyIgeDI9IjUuNzUiIHkyPSIxMS40MjY3IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMwRkNCRUIiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjE3MEY1Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQzX2xpbmVhcl8yMDc1XzU1NzE5IiB4MT0iOC4yNTgzMyIgeTE9IjMuMzMzMzQiIHgyPSI1Ljc1IiB5Mj0iMy4zMzMzNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMEZDQkVCIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzIxNzBGNSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzIwNzVfNTU3MTkiPgo8cmVjdCB3aWR0aD0iMTUiIGhlaWdodD0iMTYiIGZpbGw9IndoaXRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjUpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg=="
  },
  {
    id: "bitget",
    name: "Bitget Wallet",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iMTIiIGZpbGw9IiMwMDAwMDAiLz4KPHBhdGggZD0iTTcuNTAwMyAyNy44MDEyQzkuODc0NCAzMi41NzQ0IDE1LjA0MDIgMzQuOTk1NiAyMC4zMTkgMzQuOTYxNEMyNS41OTc4IDM0Ljk5NTYgMzAuNzYzNSAzMi42MDc4IDMzLjEzNzcgMjcuODAxMkMzNS41NzgyIDIzLjA2MTEgMzQuNDI3IDE3LjMwMjQgMzAuMzU1NSAxMy44MDk0QzI2LjI4NCAxMC4zMTY0IDIwLjMxOSAxMC4xNDkxIDE2LjE0OTEgMTMuNjQyQzExLjk2NzYgMTcuMTM1IDE3LjYzODcgMTQuNjUxMiAxOS40NjE0IDE0LjY1MTJDMjEuMTQyMiAxNC42NTEyIDI3LjE0NjQgMTcuMDY3OCAyMi4xMDgxIDE5LjY1MTJDMTMuMjU5MyAyMy44NjYxIDE1LjM4MzUgMjAuMjg0NCAxMy4xMjU5IDIzLjA5NDQDQzEwLjU1NjIgMjMuODM2OCA3LjUwMDMgMjcuODAxMloiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8yMDQ5XzQpIi8+CjxwYXRoIGQ9Ik0zMy4xMzc2IDI3Ljg0NTdDMzAuNzY2OSAzMi42NTIyIDI1LjU2MTIgMzQuOTczNCAyMC4zMTg4IDM0LjkzOTJDMTUuMDc2NCAzNC45NzM0IDkuOTEwNjYgMzIuNjE5MSA3LjUzOTk4IDI3LjgxMjVDNS4wOTIgMjMuMDM5MiA2LjI3NjM5IDE3LjI4MDUgMTAuMzQ4IDE0LjAwMDJDMTQuNDE5NSAxMC43MTk5IDE0LjUzMjYgOC4xNjk5OSAxOC42NzM4IDExLjY2MjlDMjIuODI2NyAxNS4xNTU5IDIyLjM5NTMgMTIuNjM5NCAyNC4yMTggMTIuNjM5NEMyNi4xNzk1IDEyLjYzOTQgMjguNDc0MSAxNy4wNDU5IDMwLjcwMjggMTcuODA5NkMzMi43NDc1IDE4LjUzOTYgMzUuNTc4MSAyMy4wMzkzIDMzLjEzNzYgMjcuODQ1N1oiIGZpbGw9InVybCgjcGFpbnQxX2xpbmVhcl8yMDQ5XzQpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMjA0OV80IiB4MT0iMTIuNjg3MSIgeTE9IjExLjUwNTgiIHgyPSIyNC45MTI4IiB5Mj0iMzQuMzkxNiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjQTM4NEZGIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzI3NUJFMCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MV9saW5lYXJfMjA0OV80IiB4MT0iMjQuNDMyNCIgeTE9IjE1LjcxOTkiIHgyPSIxMy4wODE4IiB5Mj0iMzIuNjcwOCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRjQ0QjRBIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0U0OUMyQiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo="
  },
  {
    id: "solana",
    name: "Solana Wallet",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOTMuOTQgNDIuNjNIMTMuNzhjLTEuNzUgMC0yLjYyIDAtMy4wNy41NS0uNDQuNTUtLjM0IDEuMzkuMTIgMy4wN2E4LjcyIDguNzIgMCAwIDAgMy4xNyA0LjY0bDE3LjQyIDEyLjk2Yy44My42MiAxLjI0LjkzIDEuMzkgMS4zMy4xNC40LjExLjg0LS4xNyAxLjcxYTguNyA4LjcgMCAwIDEtMS44OCAzLjE2TDEyLjAxIDkwLjY4Yy0uNjcuNjctMS4wMSAxLjAxLTEuMDIgMS40MSAwIC40LjMyLjc1Ljk4IDEuNDRhOC43MiA4LjcyIDAgMCAwIDUuOSAyLjNoODAuMTZjMS43NCAwIDIuNjIgMCAzLjA3LS41NS40NC0uNTUuMzQtMS4zOS0uMTMtMy4wN2E4LjcyIDguNzIgMCAwIDAtMy4xNy00LjY0bC0xNy40Mi0xMi45NmMtLjgzLS42Mi0xLjI0LS45My0xLjM5LTEuMzMtLjE0LS40LS4xMS0uODQuMTgtMS43MWE4LjcgOC43IDAgMCAxIDEuODctMy4xNmwxOC43NS0yMC42NGMuNjctLjY3IDEuMDEtMS4wMSAxLjAyLTEuNDEgMC0uNC0uMzItLjc1LS45OC0xLjQ0YTguNzIgOC43MiAwIDAgMC01LjktMi4zeiIgZmlsbD0idXJsKCNhKSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iNjMuOTYiIHkxPSI0Mi42MyIgeDI9IjYzLjk2IiB5Mj0iOTUuODIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzliMDBmZiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM2NTAwYjYiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K"
  }
];

export interface WalletConnectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WalletConnectionModal({ open, onOpenChange }: WalletConnectionModalProps) {
  const { toast } = useToast();
  
  const connectWallet = async (wallet: WalletOption) => {
    try {
      if (wallet.id === "metamask") {
        if (typeof window.ethereum !== 'undefined') {
          // Request account access
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          
          if (accounts.length > 0) {
            const address = accounts[0];
            
            // Store in localStorage for demo purposes
            // In a real app, you would use a proper state management solution and backend
            localStorage.setItem('walletAddress', address);
            localStorage.setItem('walletProvider', 'metamask');
            
            toast({
              title: "Wallet Connected",
              description: `Connected to ${wallet.name}. Address: ${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
            });
            
            onOpenChange(false);
          }
        } else {
          toast({
            title: "MetaMask not found",
            description: "Please install MetaMask extension to connect.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Coming Soon",
          description: `${wallet.name} integration is coming soon!`,
        });
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-crypto-dark-card border-crypto-border text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Connect Your Wallet
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-4">
          {walletOptions.map((wallet) => (
            <Button
              key={wallet.id}
              variant="outline"
              className={`flex justify-between items-center p-4 h-auto border-crypto-border hover:bg-crypto-dark-bg/50 ${
                wallet.primary 
                  ? "border-crypto-neon-blue/30 bg-crypto-dark-bg/20" 
                  : ""
              }`}
              onClick={() => connectWallet(wallet)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-crypto-dark-bg">
                  <img src={wallet.icon} alt={wallet.name} className="w-6 h-6" />
                </div>
                <span className="text-lg font-medium">{wallet.name}</span>
              </div>
              {wallet.primary && (
                <span className="text-xs px-2 py-1 bg-crypto-neon-blue/20 text-crypto-neon-blue rounded-full">
                  Popular
                </span>
              )}
            </Button>
          ))}
        </div>
        
        <div className="text-center text-xs text-gray-400 mt-2">
          By connecting your wallet, you agree to our Terms of Service and Privacy Policy
        </div>
      </DialogContent>
    </Dialog>
  );
}
