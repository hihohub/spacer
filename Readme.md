# For instructions please refer to
- https://hihohub.github.io/spacer/

# NEW IN VERSION 10.2
- Object oriented design.
- All initializations require a container id, even for only one tree.
- - SPACER.AutoInit("DATATREE")
- The container id is user-specified.
- Users are also responsible for declaring the SPACER global variable themselves.
- The variable name "SPACER" is required and may not be changed.
- Hence, the onload handler has changed.
- It should look like the following.
- let SPACER = new Spacer();
- onload = () => {
- - SPACER.AutoInit("DATATREE");
- }
- A publish button has been added to publish an html tree file.
- The text button now works.
- However, to avoid unintentional data loss, we recommend saving html rather than text.