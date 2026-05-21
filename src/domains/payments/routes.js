import express from "express";

const router = express.Router();

/**
 * @swagger
 * /payments/getXsollaUIToken:
 *   post:
 *     summary: paymentGetUITokenAPI
 *     description: Migrated from Lambda function paymentGetUITokenAPI
 *     tags:
 *       - payments
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/getXsollaUIToken", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/payments/getXsollaUIToken",
    method: "POST",
    note: "Migrated from Lambda paymentGetUITokenAPI"
  });
});

/**
 * @swagger
 * /payments/alramPaymenetPG:
 *   post:
 *     summary: alramPaymenetPG
 *     description: Migrated from Lambda function alramPaymenetPG
 *     tags:
 *       - payments
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/alramPaymenetPG", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/payments/alramPaymenetPG",
    method: "POST",
    note: "Migrated from Lambda alramPaymenetPG"
  });
});

/**
 * @swagger
 * /payments/getTransactionID:
 *   post:
 *     summary: getTransactionID
 *     description: Migrated from Lambda function getTransactionID
 *     tags:
 *       - payments
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/getTransactionID", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/payments/getTransactionID",
    method: "POST",
    note: "Migrated from Lambda getTransactionID"
  });
});

/**
 * @swagger
 * /payments/confirmPaymentByToss:
 *   post:
 *     summary: confirmPaymentByToss
 *     description: Migrated from Lambda function confirmPaymentByToss
 *     tags:
 *       - payments
 *     responses:
 *       200:
 *         description: Success
 *       501:
 *         description: Not implemented yet
 */
router.post("/confirmPaymentByToss", (req, res) => {
  res.status(501).json({
    message: "Not implemented yet",
    endpoint: "/payments/confirmPaymentByToss",
    method: "POST",
    note: "Migrated from Lambda confirmPaymentByToss"
  });
});

export default router;
