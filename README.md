# duplicate-finder package

A very simple VS Code extension to identify duplicated lines.<br />

Select lines where you want to list the lines appearring twice or more, press Cmd+Alt+L and it will print bellow the duplicated lines.<br />

It doesn't remove the duplicates, a lot of extensions are doing it well already.<br />

### Example:

List Duplicated line with Cmd+Alt+L or Ctrl+Alt+L:<br />

abc<br />
cbd<br />
cbd<br />
cde<br />
cde<br />
def<br />

=> cbd<br />
=> cde<br />
<br />

List Duplicated line with Cmd+Alt+K or Ctrl+Alt+K:<br />

abc<br />
cbd<br />
cbd<br />
cde<br />
cde<br />
cde<br />
def<br />

=> cbd: 2<br />
=> cde: 3<br />
