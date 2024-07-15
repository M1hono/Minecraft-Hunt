// priority: 0

// Visit the wiki for more info - https://kubejs.com/

console.log(1212);
ClientEvents.loggedIn(event => {
    RenderObjectManager.register({
        example_triangle: {
            type: "triangles",
            r: 128,
            g: 255,
            b: 29,
            a: 150,
            vertices: [
                -0.120, 0.00, 0.001,
                0.0000, 0.20, 0.001,
                0.1200, 0.00, 0.001,
                -0.064, 0.03, 0.000,
                0.0000, 0.14, 0.000,
                0.0640, 0.03, 0.000
            ],
            options: {
                blend: true,
                depth_test: true,
                cull: false,
                billboard: "center"
            }
        },
        example_lines: {
            type: "line_strip",
            line_width: 4.0,
            r: 1,
            g: 1,
            b: 1,
            a: 1,
            vertices: [],
            options: {
                blend: true,
                depth_test: false,
                cull: false
            }
        },
        example_block: {
            type: "blocks",
            vertices: [
                -0.5, -0.0001, -0.5
            ],
            options: {
                blend: true,
                depth_test: false,
                cull: false
            },
            block: "minecraft:ice"
        },
        example_item: {
            type: "items",
            vertices: [
                0.0, 3.0001, 0.1
            ],
            options: {
                blend: true,
                depth_test: false,
                cull: false,
                billboard: "vertical",
                transformation: {
                    scale: [2.0, 2.0, 2.0]
                }
                // transformation: [
                //     1.0, 1.0, 1.0, 1.0,
                //     1.0, 1.0, 1.0, 1.0,
                //     1.0, 1.0, 1.0, 1.0,
                //     1.0, 1.0, 1.0, 1.0
                // ]
            },
            item: "minecraft:totem_of_undying"
        },
        example_icon: {
            type: "icons",
            texture_width: 16,
            texture_height: 16,
            vertices: [
                0.0, 0.0, 0.0
            ],
            options: {
                blend: true,
                depth_test: false,
                cull: false,
                billboard: "vertical",
            },
            icon: "minecraft:textures/item/diamond_sword.png"
        }
    })
})

RenderEntityEvents.afterRender(event => {
    let e = event.getEntity();
    let h = e.getBbHeight();
    let w = e.getBbWidth();
    event.render("example_block");
    let o = event.getObject("example_item");
    //console.log(o);
    o.render();
    //event.render("example_icon");
    event.renderWithOffset("example_triangle", [0.0, h + 0.2, 0.0])
    let o2 = event.getObject("example_lines");
    o2.setVertices([
        -w, h, 0.001,
        w, h, 0.001,
        w, h, 0.001,
        w, 0, 0.001,
        w, 0, 0.001,
        -w, 0, 0.001,
        -w, 0, 0.001,
        -w, h, 0.001
    ]);
    o2.render();
})

RenderLevelEvents.afterSolidBlockRender(event => {
    // event.renderInWorld("example_triangle", 100.5, 100.5, 100.5)
    // let vec3 = event.getCamera().getPosition();
    // let o = event.getObject("example_triangle");
    // o.offset(0, -vec3.x, -vec3.y, -vec3.z);
    // o.offset(1, 100.5, 100.5, 100.5);
    // o.render();
})

// RenderEntityEvents.afterRender(event => {
//     const offset = event.getEntity().self().getBbHeight() + 0.2;
//     const poseStack = event.getPoseStack();
//     const rgb = [0.534, 0.694, 0.514, 0.471, 0.635, 0.427];
//     const alpha = 1.0;
//
//     poseStack.pushPose();
//     poseStack.translate(0.0, offset, 0.0);
//     poseStack.mulPose(event.getRenderer().entityRenderDispatcher.cameraOrientation());
//
//     RenderSystem.enableBlend();
//     RenderSystem.enableDepthTest();
//     RenderSystem.depthMask(true);
//     RenderSystem.blendFuncSeparate(GlStateManager$SourceFactor.SRC_ALPHA, GlStateManager$DestFactor.ONE_MINUS_SRC_ALPHA, GlStateManager$SourceFactor.ONE, GlStateManager$DestFactor.ZERO);
//     RenderSystem.setShader(() => GameRenderer.getPositionColorShader());
//
//     let matrix4f = poseStack.last().pose();
//     let tesselator = Tesselator.getInstance();
//     let builder = tesselator.getBuilder();
//
//     builder.begin(VertexFormat$Mode.TRIANGLES, DefaultVertexFormat.POSITION_COLOR);
//     // outer
//     builder.vertex(matrix4f, -0.12, 0.0, 0.001).color(rgb[0], rgb[1], rgb[2], alpha).endVertex();
//     builder.vertex(matrix4f, 0.0, 0.2, 0.001).color(rgb[0], rgb[1], rgb[2], alpha).endVertex();
//     builder.vertex(matrix4f, 0.12, 0.0, 0.001).color(rgb[0], rgb[1], rgb[2], alpha).endVertex();
//     // inner
//     builder.vertex(matrix4f, -0.064, 0.03, 0.0).color(rgb[3], rgb[4], rgb[5], alpha).endVertex();
//     builder.vertex(matrix4f, 0.0, 0.14, 0.0).color(rgb[3], rgb[4], rgb[5], alpha).endVertex();
//     builder.vertex(matrix4f, 0.064, 0.03, 0.0).color(rgb[3], rgb[4], rgb[5], alpha).endVertex();
//
//     tesselator.end();
//
//     RenderSystem.disableDepthTest();
//     RenderSystem.disableBlend();
//
//     poseStack.popPose();
// })
//
// RenderLevelEvents.afterSolidBlockRender(event => {
//     let vec3 = event.getCamera().getPosition();
//     const pos = [100, 100, 100];
//     const poseStack = event.getPoseStack();
//     const rgb = [0.534, 0.694, 0.514, 0.471, 0.635, 0.427];
//     const alpha = 1.0;
//
//     poseStack.pushPose();
//     poseStack.translate(-vec3.x, -vec3.y, -vec3.z);
//
//     RenderSystem.enableBlend();
//     RenderSystem.enableDepthTest();
//     RenderSystem.depthMask(true);
//     RenderSystem.blendFuncSeparate(GlStateManager$SourceFactor.SRC_ALPHA, GlStateManager$DestFactor.ONE_MINUS_SRC_ALPHA, GlStateManager$SourceFactor.ONE, GlStateManager$DestFactor.ZERO);
//     RenderSystem.setShader(() => GameRenderer.getPositionColorShader());
//
//     let matrix4f = poseStack.last().pose();
//     let tesselator = Tesselator.getInstance();
//     let builder = tesselator.getBuilder();
//
//     builder.begin(VertexFormat$Mode.TRIANGLES, DefaultVertexFormat.POSITION_COLOR);
//     // outer
//     builder.vertex(matrix4f, pos[0]-0.12, pos[0], pos[0]+0.001).color(rgb[0], rgb[1], rgb[2], alpha).endVertex();
//     builder.vertex(matrix4f, pos[0], pos[0]+0.2, pos[0]+0.001).color(rgb[0], rgb[1], rgb[2], alpha).endVertex();
//     builder.vertex(matrix4f, pos[0]+0.12, pos[0], pos[0]+0.001).color(rgb[0], rgb[1], rgb[2], alpha).endVertex();
//     // inner
//     builder.vertex(matrix4f, pos[0]-0.064, pos[0]+0.03, pos[0]).color(rgb[3], rgb[4], rgb[5], alpha).endVertex();
//     builder.vertex(matrix4f, pos[0], pos[0]+0.14, pos[0]).color(rgb[3], rgb[4], rgb[5], alpha).endVertex();
//     builder.vertex(matrix4f, pos[0]+0.064, pos[0]+0.03, pos[0]).color(rgb[3], rgb[4], rgb[5], alpha).endVertex();
//
//     tesselator.end();
//
//     // RenderSystem.disableDepthTest();
//     // RenderSystem.disableBlend();
//
//     poseStack.popPose();
// })
